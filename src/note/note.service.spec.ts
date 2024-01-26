import { MongoDBConnector } from '../mongodb.connector';
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


  describe('updateNote', () => {
    it('should update a note', async () => {
      const slug = 'test-slug';
      const text = 'my-note';
      const newText = 'new-note';

      mongoDBConnector.getDB()?.collection('notes').insertOne({
        slug,
        text
      })

      const result = await noteService.updateNote(slug, newText);

      expect(result).toBeTruthy();
      
      const updatedText = await noteService.getNote(slug);

      expect(updatedText).toBe(newText);
    });
  });
});