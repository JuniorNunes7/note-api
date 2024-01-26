import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { NoteService } from "./note.service";

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':slug')
  async getNote(@Param('slug') slug: string): Promise<string> {
    if (!slug) {
      throw Error('invalid slug');
    }

    return await this.noteService.getNote(slug);
  }

  @Put(':slug')
  async updateNote(@Param('slug') slug: string, @Body('text') text: string): Promise<any> {
    if (!slug) {
      throw Error('invalid slug');
    }

    return await this.noteService.updateNote(slug, text);
  }
}