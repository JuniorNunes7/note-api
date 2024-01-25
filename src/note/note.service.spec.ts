import MongoDBConnector from '../mongodb.connector';
import { NoteService } from './note.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('NoteService', () => {
  let noteService: NoteService;
  let mongoDBConnector: MongoDBConnector;

  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongod.getUri();

    mongoDBConnector = new MongoDBConnector();
    await mongoDBConnector.connect();

    noteService = new NoteService(mongoDBConnector);
  });

  afterAll(async () => {
    mongoDBConnector.disconnect();
  });

  describe('getNote', () => {
    it('should return text saved for slug', async () => {
      const slug = 'test-slug';
      const text = 'my-note';

      mongoDBConnector.getDB()?.collection('notes').insertOne({
        slug,
        text
      })
      const result = await noteService.getNote(slug);

      expect(result).toBe(text);
    });

    it('should return empty text when slug not exists', async () => {
      const slug = 'not-exists-slug';
  
      const result = await noteService.getNote(slug);
  
      expect(result).toBeNull();
    });
    it('should call db to check slug', async () => {
      const slug = 'not-exists-slug';
  
      const result = await noteService.getNote(slug);
  
      expect(result).toBeNull();
    });
  });


  // describe('updateNote', () => {
  //   it('deve retornar true após a atualização da nota', () => {
  //     const noteService = new NoteService();
  //     const slug = 'test-slug';
  //     const newText = 'Novo texto da nota';

  //     const result = noteService.updateNote(slug, newText);

  //     expect(result).toBe(true);
  //   });
  // });
});