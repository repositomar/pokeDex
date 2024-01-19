import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PokeApiService } from '../services/poke-api.service';

@Controller()
export class PokeApiController {
  constructor(private readonly pokeApiService: PokeApiService) {}

  @Get('poke-api/pokemon')
  getAllPokemon(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1302), ParseIntPipe) limit: number,
    @Query('s') s: string,
  ) {
    return this.pokeApiService.getAllPokemon(page, limit, s);
  }
}
