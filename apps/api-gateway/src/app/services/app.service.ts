import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

import { configVars } from '../../configuration/schemas/configuration.schema';
import { HelloSchema } from '../schemas/hello.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService
  ) {}

  hello(): HelloSchema {
    return { message: 'Welcome to api-gateway!' };
  }

  async healthCheck() {
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
