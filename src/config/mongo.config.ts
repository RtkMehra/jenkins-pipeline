import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      // MONGODB_URL is in .env file
      // MONGO_REPL_SET is in .env file
      // MONGO_AUTH_SOURCE is in .env file
      uri: this.configService.get<string>('MONGO_URI'),
    //   useUnifiedTopology: true,
      replicaSet: this.configService.get<string>('MONGO_REPL_SET'),
      authSource: this.configService.get<string>('MONGO_AUTH_SOURCE'),
    };
  }
}
