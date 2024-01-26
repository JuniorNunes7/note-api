import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { NoteModule } from './note/note.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(NoteModule);
  await app.listen(3000);
}
bootstrap();
