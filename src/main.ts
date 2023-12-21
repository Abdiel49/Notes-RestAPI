import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); // for cass-validation
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // for validation tdo on response

  await app.listen(3000);
}
bootstrap();
