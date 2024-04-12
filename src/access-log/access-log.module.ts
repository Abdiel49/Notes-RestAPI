import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { AccessLogController } from './access-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from './entities/access-log.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessLog])],
  controllers: [AccessLogController],
  providers: [AccessLogService, UserService],
})
export class AccessLogModule {}
