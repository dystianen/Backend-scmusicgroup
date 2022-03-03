import { IsEmail } from 'class-validator';

export class CheckEmailUserDto {
  // @IsNotEmpty()
  // username: string;

  @IsEmail()
 pic_email: string;
}
