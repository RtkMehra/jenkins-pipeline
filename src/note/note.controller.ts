import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Note> {
    return this.noteService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.update(id, createNoteDto);
  }

  @Patch(':id/pin')
  async pin(@Param('id') id: string, @Body('pinned') pinned: boolean): Promise<Note> {
    return this.noteService.pin(id, pinned);
  }
}
