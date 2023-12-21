import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    const newNote = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(newNote);
  }

  findAll() {
    return this.notesRepository.find();
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOne({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`No note found with id: ${id}`);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.notesRepository.findOne({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`No note found with id: ${id}`);
    }

    console.log('updateNoteDto keys', Object.keys(updateNoteDto));
    Object.keys(updateNoteDto).forEach((key) => {
      if (key in note && updateNoteDto[key] !== undefined) {
        note[key] = updateNoteDto[key];
      }
    });

    return this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });

    if (!note) {
      throw new NotFoundException(`No note found with id: ${id}`);
    }

    // return true;
    return await this.notesRepository.softDelete(id);
  }
}
