import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isAlreadySigned = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isAlreadySigned) {
      throw new HttpException(
        'Email already register',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { name, password, email } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findUserByName(name: string) {
    const user = await this.userRepository.findOne({ where: { name } });

    if (!user) {
      throw new NotFoundException(`No user found with name: ${name}`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found with email: ${email}`);
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }

    user.email = updateUserDto.email || user.email;
    user.name = updateUserDto.name || user.name;
    user.password = updateUserDto.password || user.password;

    return this.userRepository.save(user);
  }

  remove(id) {
    return this.userRepository.softDelete(id);
  }
}
