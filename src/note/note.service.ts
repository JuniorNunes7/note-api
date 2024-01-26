import { Injectable } from '@nestjs/common';
import { MongoDBConnector } from '../mongodb.connector';
import { Db } from 'mongodb';

@Injectable()
export class NoteService {
  constructor(private readonly mongoDBConnector: MongoDBConnector) {
    this.mongoDBConnector.connect()
  }

  async getNote(slug: string): Promise<any> {
    const db: Db | null = this.mongoDBConnector.getDB();
    const doc = await db?.collection('notes').findOne({ slug });    
    
    return doc ? doc.text || null : null
  }

  async updateNote(slug: string, text: string): Promise<any> {
    const db: Db | null = this.mongoDBConnector.getDB();
    const query = { slug };
    const update = { $set: { text } };
    const options = { upsert: true };

    const response = await db?.collection('notes').updateOne(query, update, options);
    
    return response ? response.acknowledged : false;
  }
}