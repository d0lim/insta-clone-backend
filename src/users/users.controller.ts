import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new user',
    description:
      'This api lets you create new user with appropriate user information',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'New user created!' })
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }
}
