import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { ConfigurationModule } from '../configuration/configuration.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [ConfigurationModule, TerminusModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
