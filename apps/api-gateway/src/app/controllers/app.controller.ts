import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

import { HelloSchema } from '../schemas/hello.schema';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello(): HelloSchema {
    return this.appService.hello();
  }

  @Get('health')
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.appService.healthCheck();
  }
}
