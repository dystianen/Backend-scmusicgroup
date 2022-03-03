import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import * as uuid from 'uuid';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private usersRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const dataTransaction = new Transaction();

    dataTransaction.id = uuid.v4();
    dataTransaction.artistName = createTransactionDto.artistName;
    dataTransaction.firstName = createTransactionDto.firstName;
    dataTransaction.lastName = createTransactionDto.lastName;
    dataTransaction.email = createTransactionDto.email;
    dataTransaction.bankName = createTransactionDto.bankName;
    dataTransaction.accountNumber = createTransactionDto.accountNumber;
    dataTransaction.accountName = createTransactionDto.accountName;
    dataTransaction.phone = createTransactionDto.phone;
    dataTransaction.status = true;

    return await this.usersRepository.insert(dataTransaction);
  }

  findAll() {
    return this.usersRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateUserDto: UpdateTransactionDto) {
    try {
      await this.usersRepository.findOneOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    // const result = await this.usersRepository.update(id);

    return this.usersRepository.findOneOrFail(id);
  }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.usersRepository.delete(id);
  }
}
