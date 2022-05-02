import { Query, Resolver } from '@nestjs/graphql';

import { HelloSchema } from '../schemas/hello.schema';
import { AppService } from '../services/app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => HelloSchema)
  hello() {
    return this.appService.hello();
  }
}
