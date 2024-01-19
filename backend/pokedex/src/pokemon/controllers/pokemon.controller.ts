import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonDTO, UpdatePokemonDTO } from '../dtos';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('pokemon')
  @ApiResponse({
    status: 201,
    description: 'Create a pokemon',
  })
  @ApiBody({ type: CreatePokemonDTO, required: true })
  createPokemon(@Body() body: CreatePokemonDTO) {
    return this.pokemonService.createPokemon(body);
  }

  @Post(':pokemonId')
  @ApiResponse({
    status: 201,
    description: 'Create PDF',
  })
  @ApiParam({ name: 'pokemonId', description: 'PokemonId', required: true })
  exportPokemon(
    @Param('pokemonId') pokemonId: string,
    @Res({ passthrough: true }) res,
  ) {
    return this.pokemonService.exportPokemon(pokemonId, res);
  }

  @Get(':pokemonId')
  @ApiResponse({
    status: 200,
    description: 'Get pokemon',
  })
  @ApiParam({ name: 'pokemonId', description: 'PokemonId', required: true })
  getPokemon(@Param('pokemonId') pokemonId: string) {
    return this.pokemonService.getPokemon(pokemonId);
  }

  @Get('pokemon')
  @ApiResponse({
    status: 200,
    description: 'Get all pokemon',
  })
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Put(':pokemonId')
  @ApiResponse({
    status: 200,
    description: 'Update pokemon',
  })
  @ApiParam({ name: 'pokemonId', description: 'PokemonId', required: true })
  updatePokemon(
    @Param('pokemonId') pokemonId: string,
    @Body() body: UpdatePokemonDTO,
  ) {
    return this.pokemonService.updatePokemon(pokemonId, body);
  }

  @Delete(':pokemonId')
  @ApiResponse({
    status: 200,
    description: 'Delete pokemon',
  })
  @ApiParam({ name: 'pokemonId', description: 'PokemonId', required: true })
  deletePokemon(@Param('pokemonId') pokemonId: string) {
    return this.pokemonService.deletePokemon(pokemonId);
  }
}
