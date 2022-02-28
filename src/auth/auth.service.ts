import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { hashPassword } from '../helper/hash_password';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @Inject(
      forwardRef(() => {
        return UsersService;
      }),
    )
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === (await hashPassword(password, user.salt))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { user } = await this.usersService.findOneByUsernameOrEmail(
      loginUserDto.usernameOrEmail,
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
          message: 'Your account is not Active',
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
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: sessionData.refresh_token,
    };
  }
}
