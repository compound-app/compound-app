import { INestApplication, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export function coreSetup(): string {
  return 'core-setup';
}

export const createService = async (
  app: INestApplication,
  proto: string,
  host = '0.0.0.0',
  port: number,
  serviceName: string
) => {
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `${host}:${port}`,
      package: serviceName,
      protoPath: join(process.cwd(), `/dist/libs/proto-schema/${proto}`),
    },
  });

  await app.startAllMicroservices();
  await app.listen(null);

  Logger.log(`gRPC service-${serviceName} :: running on port ${port}`);
  Logger.log(`REST service-${serviceName} :: running at ${await app.getUrl()}`);
};
