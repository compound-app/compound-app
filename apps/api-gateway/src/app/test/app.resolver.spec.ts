import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigurationModule } from '../../configuration/configuration.module';
import { AppResolver } from '../resolvers/app.resolver';
import { AppService } from '../services/app.service';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigurationModule, TerminusModule, HttpModule],
      providers: [AppService, AppResolver],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('hello', () => {
    it('should return "Welcome to api-gateway!"', () => {
      expect(resolver.hello()).toEqual({
        message: 'Welcome to api-gateway!',
      });
    });
  });
});
