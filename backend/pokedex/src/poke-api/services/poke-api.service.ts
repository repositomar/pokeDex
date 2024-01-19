import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokeApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private baseUrl = this.configService.get<string>('pokeApi.url');

  async getPokemon(name: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${name}`),
      );
      return response.data;
    } catch (error) {
      Logger.log(error.response.data);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Pokemon not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllPokemon(page: number, limit: number, s: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}`, {
          params: {
            offset: page * limit,
            limit: limit,
          },
        }),
      );

      response.data.results.sort(
        (a: Record<string, any>, b: Record<string, any>) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        },
      );

      if (s) {
        const result = response.data.results.filter((a: Record<string, any>) =>
          a.name.startsWith(s),
        );

        response.data.results = result;
      }

      return response.data;
    } catch (error) {
      Logger.log(error.response.data);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Pokemon not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
