import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
