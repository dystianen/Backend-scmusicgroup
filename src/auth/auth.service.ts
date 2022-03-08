import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import * as uuid from 'uuid';
import { hashPassword } from '../helper/hash_password';
import { UsersService } from '../users/users.service';
import {Session} from "./entities/session.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(Session)
      private sessionRepository: Repository<Session>,
      private jwtService: JwtService,
      private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;

      return rest;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { user } = await this.usersService.findOneByUsernameOrEmail(
      loginUserDto.username,
    );

    if (
      user.password !== (await hashPassword(loginUserDto.password, user.salt))
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Incorrect Password',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.isActive) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Your account is not active',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const sessionData = new Session();

    sessionData.id = uuid.v4();
    sessionData.user = user;
    sessionData.refresh_token = uuid.v4();

    await this.sessionRepository.insert(sessionData);

    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: sessionData.refresh_token,
    };
  }
}
