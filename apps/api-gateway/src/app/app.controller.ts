import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

import { AppService } from './app.service';
import { globalPrefix, port } from './constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator
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
          `http://localhost:${port}/${globalPrefix}`
        ),
    ]);
  }
}
