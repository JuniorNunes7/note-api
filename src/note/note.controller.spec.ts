import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

jest.mock('./note.service');

describe('NoteController', () => {
  let noteController: NoteController;
  let noteService: NoteService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    noteController = app.get<NoteController>(NoteController);
    noteService = app.get<NoteService>(NoteService);
  });

  describe('getNote', () => {
    it('should return the slug note', async () => {
      const slug = 'my-slug';
      const expectedText = 'my text';

      (noteService.getNote as jest.Mock).mockImplementation(async () => expectedText);

      const result = await noteController.getNote(slug);

      expect(result).toBe(expectedText);
    });

    it('should throw error if slug is empty', async () => {
      const slug = '';

      (noteService.getNote as jest.Mock).mockImplementation(async () => '');

      await expect(noteController.getNote(slug)).rejects.toThrow(Error);
    });
  });
});
