import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: `Get Auth info. (Authorization Needed!!)`,
    description: `Get profile about user logged in. Do not forget to authorize your token before executing this api.`,
  })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Log in',
    description: 'This api lets you log in to server and returns jwt token.',
  })
  @ApiBody({ type: LogInDto })
  @ApiCreatedResponse({
    description:
      'Successfully logged in to server. Please use jwt token for authorization.',
  })
  @ApiUnauthorizedResponse({
    description:
      'Failed to log in to server. Please check your email and password.',
  })
  async login(@Request() req: LogInDto) {
    return this.authService.login(req.user);
  }
}
