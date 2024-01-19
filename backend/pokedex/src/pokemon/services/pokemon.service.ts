import jsPDF from 'jspdf';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDTO } from '../dtos/create-pokemon.dto';
import { Pokemon, PokemonDocument } from '../schemas/pokemon.schema';
import { PokeApiService } from '../../poke-api/services/poke-api.service';

export interface IPokemon {
  name: string;
  alias: string;
  base_experience: number;
  height: number;
  weight: number;
  is_Active: boolean;
}

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonDocument: Model<PokemonDocument>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  async createPokemon(createPokemonData: CreatePokemonDTO): Promise<IPokemon> {
    const { name, alias } = createPokemonData;
    const { base_experience, height, weight } =
      await this.pokeApiService.getPokemon(name);

    const payload = {
      name,
      alias,
      base_experience,
      height,
      weight,
      is_Active: true,
    };

    return await this.pokemonDocument.create(payload);
  }

  async getPokemon(pokemonId: string): Promise<IPokemon> {
    const existingPokemon = await this.pokemonDocument.findById({
      _id: pokemonId,
    });

    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with id: ${pokemonId} not found`);
    }
    return existingPokemon;
  }

  async getAllPokemon(): Promise<IPokemon[]> {
    return await this.pokemonDocument.find({ is_Active: true });
  }

  async updatePokemon(
    pokemonId: string,
    update: Record<string, any>,
  ): Promise<IPokemon> {
    const existingPokemon = await this.pokemonDocument.findByIdAndUpdate(
      pokemonId,
      { $set: update },
      { new: true },
    );

    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with id: ${pokemonId} not found`);
    }
    return existingPokemon;
  }

  async deletePokemon(pokemonId: string): Promise<IPokemon> {
    const deletedPokemon = await this.pokemonDocument.findByIdAndUpdate(
      pokemonId,
      { $set: { is_Active: false } },
      { new: true },
    );

    if (!deletedPokemon) {
      throw new NotFoundException(`Pokemon with id: ${pokemonId} not found`);
    }
    return deletedPokemon;
  }

  async exportPokemon(pokemonId: string, res: any) {
    const existingPokemon = await this.pokemonDocument.findById({
      _id: pokemonId,
    });

    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with id: ${pokemonId} not found`);
    }

    const doc = new jsPDF();

    doc.text(existingPokemon.toString(), 10, 10);
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Length', doc.getCharSpace());
    res.header(
      'Content-Disposition',
      `attachment; filename=${existingPokemon.name}`,
    );
    return doc.output('datauristring');
  }
}
