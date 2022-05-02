import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

import { configVars } from '../../configuration/schemas/configuration.schema';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.http.pingCheck(
          'api-gateway',
          `http://localhost:${this.configService.get<number>(
            configVars.PORT
          )}/${this.configService.get<string>(configVars.GLOBAL_PREFIX)}`
        ),
    ]);
  }
}
