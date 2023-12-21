import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || '',
      // url: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT) || 5432,
      password: process.env.PGPASSWORD,
      username: process.env.PGUSER,
      database: process.env.PGDATABASE,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: ['./dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
