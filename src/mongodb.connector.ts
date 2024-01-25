import { MongoClient, Db } from 'mongodb';

class MongoDBConnector {
  private client: MongoClient;
  private db: Db | null;

  constructor() {    
    this.client = new MongoClient(process.env.MONGO_URI || '');
    this.db = null;
  }

  async connect(): Promise<void> {
    await this.client.connect();
    this.db = this.client.db();
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  getDB(): Db | null {
    return this.db;
  }
}

export default MongoDBConnector;