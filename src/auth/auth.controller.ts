import {Controller, Post, HttpStatus, Body, UseGuards, Request} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from "./local-auth.guard";
import { CreateUserDto } from './dto/create-user.dto';
import {UsersService} from "../users/users.service";

@Controller('auth')
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
      message: 'Login Successful',
      data: await this.authService.login(loginUserDto),
    };
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success create Account',
    };
  }
}
