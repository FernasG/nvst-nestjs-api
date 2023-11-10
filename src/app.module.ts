import { Module } from '@nestjs/common';
import { PrismaModule } from './database';
import { UsersModule } from './users/users.module';
import { RevenuesModule } from './revenues/revenues.module';

@Module({
  imports: [PrismaModule, UsersModule, RevenuesModule]
})
export class AppModule { }
