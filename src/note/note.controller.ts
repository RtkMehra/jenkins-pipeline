import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.noteService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Patch(':id/pin')
  async pin(@Param('id') id: string, @Body('pinned') pinned: boolean) {
    return this.noteService.pin(id, pinned);
  }
}
