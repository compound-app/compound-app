import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigurationModule } from '../../configuration/configuration.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigurationModule, TerminusModule, HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('hello', () => {
    it('should return "Welcome to api-gateway!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.hello()).toEqual({
        message: 'Welcome to api-gateway!',
      });
    });
  });
});
