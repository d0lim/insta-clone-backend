import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @ApiProperty({ type: String, description: `Cat's name` })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: `Cat's age` })
  readonly age: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: `Cat's breed` })
  readonly breed: string;
}
