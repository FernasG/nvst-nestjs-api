import { Module } from '@nestjs/common';
import { PrismaModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@authentication';
import { RevenuesModule } from './revenues/revenues.module';
import { UsersModule } from './users/users.module';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UsersModule,
    PrismaModule,
    RevenuesModule,
    AuthenticationModule
  ]
})
export class AppModule { }
