import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePokemonDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
  @ApiProperty({ type: String })
  @IsString()
  alias: string;
}
