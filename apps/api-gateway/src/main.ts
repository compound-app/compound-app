import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { configVars } from './configuration/schemas/configuration.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(configVars.PORT);
  const globalPrefix = configService.get<string>(configVars.GLOBAL_PREFIX);

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
