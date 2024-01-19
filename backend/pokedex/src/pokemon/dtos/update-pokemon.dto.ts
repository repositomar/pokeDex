import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePokemonDTO {
  @ApiProperty({ type: String })
  @IsString()
  alias: string;
}
