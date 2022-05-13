import { Controller, Get, Param, Req } from '@nestjs/common';
import { SerieModel } from './series/models/serie.model';
import { SeriesService } from './series/series.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly _serieService: SeriesService) {}

  @Get('/discover')
  getDiscoverSeries(): Promise<SerieModel[]> {
    const data = this._serieService.getDiscoverSeries();
    return data;
  }

  @Get('/serie/:id')
  getSerieDetail(@Param('id') id) {
    return this._serieService.getSerieDetail(Number.parseInt(id));
  }

  @Get('/search')
  search(@Req() request: Request) {
    const term = request.query.term;
    if (term) {
      return this._serieService.searchByTerm(term.toString());
    } else {
      return 'Invalid search term';
    }
  }
}
