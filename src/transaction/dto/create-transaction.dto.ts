import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  artistName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  accountNumber: string;
}
