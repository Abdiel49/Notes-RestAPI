import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AccessLogModule } from './access-log/access-log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
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
    NotesModule,
    CategoryModule,
    UserModule,
    AccessLogModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
