import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema({
  timestamps: true,
})
export class Pokemon {
  @Prop()
  name: string;
  @Prop()
  alias: string;
  @Prop()
  base_experience: number;
  @Prop()
  height: number;
  @Prop()
  weight: number;
  @Prop()
  is_Active: boolean;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
