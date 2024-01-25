import MongoDBConnector from '../mongodb.connector';
import { Db } from 'mongodb';

export class NoteService {
  constructor(private readonly mongoDBConnector: MongoDBConnector) {}

  async getNote(slug: string): Promise<any> {
    const db: Db | null = this.mongoDBConnector.getDB();
    const doc = await db?.collection('notes').findOne({ slug });

    return doc ? doc.text || null : null
  }

  async updateNote(slug: string, content: string): Promise<any> {
    const db: Db | null = this.mongoDBConnector.getDB();
    const query = { slug };
    const update = { $set: { content } };
    const options = { upsert: true };

    return db?.collection('notes').updateOne(query, update, options);
  }
}