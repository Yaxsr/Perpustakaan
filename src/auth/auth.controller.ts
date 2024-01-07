import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { authUserDTO } from './auth.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  registerUser(@Body() user: User, @Res() resp: Response) {
    return this.authService.registerUser(user, resp);
  }

  @Post('/login')
  loginUser(@Body() user: authUserDTO) {
    return this.authService.loginUser(user);
  }

  @Get('/user')
  authUser(@Req() req: Request, @Res() resp: Response) {
    return this.authService.authUser(req, resp);
  }

  @Post('/refresh')
  refreshUser(@Req() req: Request, @Res() resp: Response) {
    return this.authService.refreshUser(req, resp);
  }

  @Get('/logout')
  logoutUser(@Res() resp: Response) {
    return this.authService.logoutUser(resp);
  }
}
