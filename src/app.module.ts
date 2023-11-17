import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@database';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { RevenuesModule } from './revenues/revenues.module';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    UsersModule,
    PrismaModule,
    CoursesModule,
    RevenuesModule
  ]
})
export class AppModule { }
