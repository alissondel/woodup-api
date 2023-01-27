import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
dotenv.config();

const port = normalizePort(process.env.PORT || '3030');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(port));
  console.log(`🚀 Server is running at port: http://localhost:${port} 🚀`);
};

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port))
      return val;

  if (port >= 0)
      return port;

  return false;
}

bootstrap();