import { Controller, Get, Param } from "@nestjs/common";
import { NoteService } from "./note.service";

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':slug')
  async getNote(@Param() params: any): Promise<string> {
    if (!params.slug) {
      throw Error('invalid slug');
    }

    return await this.noteService.getNote(params.slug);
  }
}