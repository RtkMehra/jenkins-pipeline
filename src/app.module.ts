import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cpjkbeo21fec739vctt0-a',
      port: 5432,
      password: 'B5qsBOB8JqP6l6YOeUo3lp5QG7cUj6qS',
      username: 'hardik_note_project_user',
      entities: [],
      database: 'hardik_note_project',
      synchronize: true,
      logging: true,
    }),
    // UserModule,
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
