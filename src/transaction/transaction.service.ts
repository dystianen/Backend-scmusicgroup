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
    private transactionRepository: Repository<Transaction>,
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
    dataTransaction.amount = createTransactionDto.amount;
    dataTransaction.status = true;

    await this.transactionRepository.insert(dataTransaction);
  }

  // async findTransaction() {
  //   const transaction = this.transactionRepository
  //       .createQueryBuilder('transaction')
  //       .
  // }

  findAll() {
    return this.transactionRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.transactionRepository.findOneOrFail(id);
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

  async updateTransaction(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      await this.transactionRepository.findOneOrFail(id);
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

    await this.transactionRepository.update(id, updateTransactionDto);

    return this.transactionRepository.findOneOrFail(id);
  }

  async remove(id: string) {
    try {
      await this.transactionRepository.findOneOrFail(id);
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

    await this.transactionRepository.delete(id);
  }
}
