// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Injectable } from '@nestjs/common';
// import { AuthService } from '../auth/auth.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.SECRETKEY,
//     });
//   }

//   async validate(payload: JwtPayload): Promise<UserDto> {
//     const user = await this.authService.validateUser(payload);
//     if (!user) {
//       throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
//     }
//     return user;
//   }
// }