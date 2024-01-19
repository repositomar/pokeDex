import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';
import { PokeApiModule } from '../poke-api/poke-api.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema, collection: 'pokemon' },
    ]),
    PokeApiModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
