import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LogInDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: `User's email.`,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `User's password.`,
  })
  readonly password: string;

  @IsOptional()
  readonly user: any;
}
