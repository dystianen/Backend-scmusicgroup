import { IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  usernameOrEmail: string;
}
