import { Controller, Get, Param, Req } from '@nestjs/common';
import { SeriesService } from './series/series.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly _serieService: SeriesService) {}

  /**
   * Función que expone el endpoint de la API mediante un decorador
   */
  @Get('/discover')
  getDiscoverSeries() {
    const data = this._serieService.getDiscoverSeries();
    return data;
  }
  /**
   * Función que expone el endpoint de la API mediante un decorador, recibiendo un parámetro por el path
   */
  @Get('/serie/:id')
  getSerieDetail(@Param('id') id) {
    return this._serieService.getSerieDetail(Number.parseInt(id));
  }
  /**
   * Función que expone el endpoint de la API mediante un decorador, recibiendo un parámetro por la query de la URL
   */
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
