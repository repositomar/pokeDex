import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokeApiService } from './services/poke-api.service';
import { PokeApiController } from './controllers/poke-api.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [PokeApiController],
  providers: [PokeApiService],
  exports: [PokeApiService],
})
export class PokeApiModule {}
