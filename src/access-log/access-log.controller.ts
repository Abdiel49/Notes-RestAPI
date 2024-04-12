import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { CreateAccessLogDto } from './dto/create-access-log.dto';

@Controller('access-log')
export class AccessLogController {
  constructor(private readonly accessLogService: AccessLogService) {}

  @Post()
  create(@Body() createAccessLogDto: CreateAccessLogDto) {
    return this.accessLogService.create(createAccessLogDto);
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.accessLogService.findAll(limit ?? 5, offset ?? 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessLogService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessLogService.remove(id);
  }
}
