import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    // eslint-disable-next-line no-console
    console.log('heiii');

    const user = await this.authService.validateUser(email, password);

    // eslint-disable-next-line no-console
    console.log(user, 'ini usernya');

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
