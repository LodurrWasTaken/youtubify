import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConverterService } from './services/converter/converter.service';
import { FetcherService } from './services/fetcher/fetcher.service';
import { ConverterModule } from './modules/converter/converter.module';
import { join } from 'path';
import { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } from './config/env';
import { Track } from './db/track/track.entity';
import { TrackModule } from './db/track/track.module';


@Module({
  imports: [
    ConverterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'mp3'),
      serveStaticOptions: {
        index: false
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PG_HOST,
      port: PG_PORT,
      username: PG_USERNAME,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      entities: [Track],
      synchronize: true,
    }),
    TrackModule,
  ],
  controllers: [AppController],
  providers: [ConverterService, FetcherService]
})
export class AppModule { }
