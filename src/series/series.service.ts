import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api/dist/src';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeriesService {
  constructor(private readonly _theMovieDbService: TheMovieDbService) {}
  /**
   * Método para obtener las series mas populares del momento
   * @returns Retorna una promesa con el resultado de la búsqueda
   */
  async getDiscoverSeries() {
    let page = 1;
    const seriesDiscover = [];

    const args = {
      query: {
        sort_by: 'popularity.desc' as const,
        with_watch_providers: '8|9|337|384',
        watch_region: 'ES',
        page: page,
      },
    };

    try {
      while (seriesDiscover.length < 50) {
        args.query.page = page;
        const nextPage = (
          await this._theMovieDbService.getDiscoverEndpoint().tv(args)
        ).data.results;
        seriesDiscover.push(...nextPage);
        page++;
      }
    } catch (error) {
      console.log(error);
    }

    return seriesDiscover;
  }

  /**
   * Método para obtener una serie en concreto, enviado una petición a theMobieDB
   * @param id Número identifacativo de una serie
   * @returns Una promesa con todos los datos de la serie
   */
  async getSerieDetail(id: number) {
    try {
      const args = {
        pathParameters: {
          tv_id: id,
        },
      };
      const movie = await this._theMovieDbService
        .getTVEndpoint()
        .getDetails(args);
      return movie;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Método para buscar series por nombre, enviado una petición a theMobieDB
   * @param term Término de búsqueda enviado por el cliente
   * @returns Una promesa con los resultados de la búsqueda
   */
  async searchByTerm(term: string) {
    const args = {
      query: {
        query: term,
        sort_by: 'popularity.desc' as const,
        with_watch_providers: '8|9|337|384',
        watch_region: 'ES',
      },
    };
    try {
      const response = this._theMovieDbService
        .getSearchEndpoint()
        .TVShows(args);
      return (await response).data.results.filter((e) => e.poster_path);
    } catch (error) {
      console.log(error);
    }
    return 'Not found';
  }
}
