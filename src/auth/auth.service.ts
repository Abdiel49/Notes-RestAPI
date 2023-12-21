import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInAuthDto } from './dto/signIn-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInAuthDto) {
    const { password, email } = signInDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (user.email !== email) {
      throw new UnauthorizedException('Invalid username, email or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
