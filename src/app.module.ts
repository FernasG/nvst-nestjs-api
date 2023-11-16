import { Module } from '@nestjs/common';
import { PrismaModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { RevenuesModule } from './revenues/revenues.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    UsersModule,
    PrismaModule,
    RevenuesModule
  ]
})
export class AppModule { }
