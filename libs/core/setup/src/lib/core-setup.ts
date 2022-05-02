import { INestApplication, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

export function coreSetup(): string {
  return 'core-setup';
}

export const createService = async (
  app: INestApplication,
  host = '0.0.0.0',
  port: number,
  serviceName: string
) => {
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${host}:${port}`],
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(null);

  Logger.log(`KAFKA service-${serviceName} :: running on port ${port}`);
  Logger.log(`REST service-${serviceName} :: running at ${await app.getUrl()}`);
};
