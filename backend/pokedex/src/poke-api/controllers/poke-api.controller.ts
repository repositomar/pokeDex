import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PokeApiService } from '../services/poke-api.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller()
export class PokeApiController {
  constructor(private readonly pokeApiService: PokeApiService) {}

  @Get('poke-api/pokemon')
  @ApiResponse({
    status: 200,
    description: 'Get all pokemon',
  })
  @ApiQuery({
    name: 'page',
    description: 'Index of the page desired',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Size of the page desired',
    required: false,
  })
  @ApiQuery({
    name: 's',
    description: 'Value for search coincidences in Name',
    required: false,
  })
  getAllPokemon(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1302), ParseIntPipe) limit: number,
    @Query('s') s: string,
  ) {
    return this.pokeApiService.getAllPokemon(page, limit, s);
  }
}
