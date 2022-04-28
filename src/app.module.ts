import { TheMovieDbModule } from '@harshppatel/nestjs-themoviedb-api/dist/src';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesService } from './series/series.service';

@Module({
  imports: [HttpModule, TheMovieDbModule.forRoot({
    API_KEY: '06a6204d6b11ff7de648833aa5563d87',
    language: 'es',
  }) ],
  controllers: [AppController],
  providers: [AppService, SeriesService],
})
export class AppModule {}
