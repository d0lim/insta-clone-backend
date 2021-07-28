import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AllowAny } from 'src/util/allowAny';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

type ProfileResponse = {
  user?: any;
  profile: User;
};

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

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
  @AllowAny()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: `Get profile with nickname`,
    description: `Get profile about user with certain nickname.`,
  })
  async getProfile(
    @Req() req,
    @Param('nickname') nickname,
  ): Promise<ProfileResponse> {
    const profile = await this.usersService.findOne({ nickname });
    if (profile === null) {
      throw new HttpException('No such profile', HttpStatus.NOT_FOUND);
    }
    return { user: req.user || undefined, profile };
  }
}
