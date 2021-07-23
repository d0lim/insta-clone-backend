import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: `New user's email which will be used.`,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `New user's password which will be used.`,
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `New user's real-world name.`,
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `New user's instagram nickname.`,
  })
  readonly nickname: string;
}
