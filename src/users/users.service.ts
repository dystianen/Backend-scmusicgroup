import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { hashPassword } from '../helper/hash_password';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as uuid from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(createUserDto);

    return this.usersRepository.findOneOrFail(result.identifiers[0].id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = randomStringGenerator();
    const userData = new User();

    userData.id = uuid.v4();
    userData.email = createUserDto.email;
    userData.password = await hashPassword(createUserDto.password, salt);
    userData.salt = salt;
    userData.email = createUserDto.email;
    userData.username = createUserDto.username;
    userData.firstName = createUserDto.firstName;
    userData.lastName = createUserDto.lastName;

    return await this.usersRepository.insert(userData);
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

  async findOneByEmail(email: string) {
    try {
      return this.usersRepository.findOneOrFail({
        where: {
          email: email,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async findOneByUsernameOrEmail(username: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { username: username },
      });

      return {
        user,
      };
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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

    const result = await this.usersRepository.update(id, updateUserDto);

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
