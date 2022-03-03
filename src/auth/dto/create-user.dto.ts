import {
  IsEmpty,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

}
