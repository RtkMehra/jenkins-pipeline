import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Create a logger instance
  const logger = new Logger('Bootstrap');
  
  // Log a starting server message
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
