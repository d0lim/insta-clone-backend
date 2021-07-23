import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LogInDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: `User's email. Cause of passport, we need to user username not email. But input proper email here.`,
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `User's password.`,
  })
  readonly password: string;

  @IsOptional()
  readonly user: any;
}
