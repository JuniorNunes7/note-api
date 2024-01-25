import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
const mocks = require('node-mocks-http');

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

      jest.spyOn(noteService, 'getNote').mockImplementation(async () => expectedText);
  
      const req = mocks.createRequest({
        method: 'GET',
        url: `/notes/${slug}`
      })
      const result = await noteController.getNote(req);

      expect(result).toBe(expectedText);
    });
    it('should throw error if slug is empty', async () => {
      const slug = '';

      const req = mocks.createRequest({
        method: 'GET',
        url: `/notes/${slug}`
      })
      await expect(noteController.getNote(req)).rejects.toThrow(Error);
    });
  });
});
