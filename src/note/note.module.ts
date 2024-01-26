import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongoDBConnector } from 'src/mongodb.connector';

@Module({
    imports: [],
    controllers: [NoteController],
    providers: [NoteService, MongoDBConnector],
    
})
export class NoteModule { }
