import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Login Successfull',
      data: await this.authService.login(loginUserDto),
    };
  }
}
