import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users API')
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

  @Get(':nickname')
  @ApiOperation({
    summary: `Get profile with nickname`,
    description: `Get profile about user with certain nickname.`,
  })
  async getProfile(@Param('nickname') nickname) {
    const user = await this.usersService.findOne({ nickname });
    if (user === null) {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
