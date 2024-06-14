import { Injectable, NotFoundException } from '@nestjs/common';
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
      // Handle database or validation errors
      throw new Error(`Failed to create note: ${error.message}`);
    }
  }

  async findAll(): Promise<Note[]> {
    try {
      return await this.noteModel.find().sort({ pinned: -1, createdAt: -1 }).exec();
    } catch (error) {
      // Handle database errors
      throw new Error(`Failed to find notes: ${error.message}`);
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
      // Handle database or not found errors
      throw new Error(`Failed to find note: ${error.message}`);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      // const deletedNote = await this.noteModel.findByIdAndRemove(id).exec();
      // if (!deletedNote) {
      //   throw new NotFoundException(`Note with ID ${id} not found`);
      // }
      return "done";
    } catch (error) {
      // Handle database or not found errors
      throw new Error(`Failed to delete note: ${error.message}`);
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
      // Handle database or not found errors
      throw new Error(`Failed to update note: ${error.message}`);
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
      // Handle database or not found errors
      throw new Error(`Failed to pin note: ${error.message}`);
    }
  }
}
