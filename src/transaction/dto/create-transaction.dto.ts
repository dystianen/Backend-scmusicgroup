import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  artistName: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  accountName: string;

  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  status: boolean;
}
