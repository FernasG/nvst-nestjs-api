import { Module } from '@nestjs/common';
import { PrismaModule } from './database';
import { UsersModule } from './users/users.module';
import { RevenuesModule } from './revenues/revenues.module';
import { ConfigModule } from '@nestjs/config';
import config from './configuration/config';
import { AuthenticationModule } from './authentication';

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
