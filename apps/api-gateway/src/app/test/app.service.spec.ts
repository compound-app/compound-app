import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';

import { ConfigurationModule } from '../../configuration/configuration.module';
import { AppService } from '../services/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [ConfigurationModule, TerminusModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api-gateway!"', () => {
      expect(service.hello()).toEqual({ message: 'Welcome to api-gateway!' });
    });
  });
});
