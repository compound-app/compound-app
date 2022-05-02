import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { join } from 'path';

import { ConfigurationModule } from '../configuration/configuration.module';
import { AppController } from './controllers/app.controller';
import { AppResolver } from './resolvers/app.resolver';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigurationModule,
    TerminusModule,
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/api-gateway/src/gql/schema.gql'
      ),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, AppResolver],
})
export class AppModule {}
