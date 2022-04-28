import { Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './series/series.service';

@Controller()
export class AppController {
  constructor(private readonly _serieService: SeriesService) { }

  @Get('/discover')
  getDiscoverSeries() {
    let data = this._serieService.getDiscoverSeries();
    return data;
  }


  @Get('/serie/:id')
  getSerieDetail(@Param('id') id){
    let data = this._serieService.getSerieDetail(id).then(res => console.log(res))
    console.log(typeof id)
    return this._serieService.getSerieDetail(Number.parseInt(id))
  }

}
