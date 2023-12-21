import { Body, Controller, Post } from '@nestjs/common';

import { Public } from './public.decorator';

import { SignInAuthDto } from './dto/signIn-auth.dto';
import { AuthService } from './auth.service';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto);
  }
}
