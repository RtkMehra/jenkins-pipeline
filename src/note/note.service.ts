import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const createdNote = new this.noteModel(createNoteDto);
      return await createdNote.save();
    } catch (error) {
      throw new BadRequestException(`Failed to create note: ${error.message}`);
    }
  }

  async findAll({ page, limit }: { page: number; limit: number }): Promise<{ data: Note[]; total: number; page: number; limit: number }> {
    try {
      const skip = (page - 1) * limit;
      const data = await this.noteModel.find().skip(skip).limit(limit).exec();
      const total = await this.noteModel.countDocuments().exec();

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to fetch notes: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Note> {
    try {
      const note = await this.noteModel.findById(id).exec();
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return note;
    } catch (error) {
      throw new NotFoundException(`Note not found: ${error.message}`);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const deletedNote = await this.noteModel.findOneAndDelete({ _id: id }).exec();
      if (!deletedNote) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return deletedNote;
    } catch (error) {
      throw new NotFoundException(`Failed to delete note: ${error.message}`);
    }
  }

  async update(id: string, createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(id, createNoteDto, { new: true }).exec();
      if (!updatedNote) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return updatedNote;
    } catch (error) {
      throw new NotFoundException(`Failed to update note: ${error.message}`);
    }
  }

  async pin(id: string, pinned: boolean): Promise<Note> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(id, { pinned }, { new: true }).exec();
      if (!updatedNote) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return updatedNote;
    } catch (error) {
      throw new NotFoundException(`Failed to pin note: ${error.message}`);
    }
  }
}
