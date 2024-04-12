import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccessLog } from './entities/access-log.entity';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(AccessLog)
    private readonly accesslogRespository: Repository<AccessLog>,
    private readonly userService: UserService,
  ) {}

  async create(createAccessLogDto: CreateAccessLogDto) {
    // validar el id del usuario
    const userID = createAccessLogDto.user;
    await this.userService.findOne(userID);

    const accessLog =
      await this.accesslogRespository.create(createAccessLogDto);
    // const accessLog = {
    //   user: createAccessLogDto.user,
    //   lat: createAccessLogDto.lat,
    //   long: createAccessLogDto.long,
    // };
    console.log('accessLog', accessLog);

    return this.accesslogRespository.save(accessLog);
  }

  // findAll(limit = 5, offset = 1) { // dirty option
  findAll(limit: number, offset: number) {
    const skip = Math.abs(limit * offset - limit);
    return this.accesslogRespository.find({
      take: Math.abs(limit),
      skip,
      relations: ['user'],
    });
  }

  async findOne(id: string) {
    const log = await this.accesslogRespository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!log) {
      throw new NotFoundException(`No AccessLog found with id: ${id}`);
    }

    return log;
  }

  async remove(id: string) {
    const log = await this.accesslogRespository.findOne({ where: { id } });

    if (!log) {
      throw new NotFoundException(`No AccessLog found with id: ${id}`);
    }

    return this.accesslogRespository.softDelete(id);
  }
}
