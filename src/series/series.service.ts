import { TheMovieDbService } from '@harshppatel/nestjs-themoviedb-api/dist/src';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import MovieDB from 'node-themoviedb';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SeriesService {
    private apikey: string = '06a6204d6b11ff7de648833aa5563d87';
    private urlMoviedb: string = 'https://api.themoviedb.org/3';

    constructor(
        private readonly _theMovieDbService: TheMovieDbService
    ) {

    }

    async getDiscoverSeries() {
        let page = 1;
        let seriesDiscover = [];

        const args = {
            query: {
                sort_by: "popularity.desc" as const,
                with_watch_providers: '8|9|337|384',
                watch_region: 'ES',
                page: page
            }
        };

        try {
            while(seriesDiscover.length < 50) {
                args.query.page = page
                let nextPage = await (await this._theMovieDbService.getDiscoverEndpoint().tv(args)).data.results
                seriesDiscover.push(...nextPage)
                page++
            }
        }catch(error) {
            console.log(error)
        }

        
        return seriesDiscover
        
    }

    async getSerieDetail(id: number) {


        try {
            const args = {
                pathParameters: {
                    tv_id: id,
                },
            }
            const movie = await this._theMovieDbService.getTVEndpoint().getDetails(args)
            return movie
        } catch (error) {
            console.error(error)
        }

        return "Not found"


    }


}
