import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@database';
import { User } from './authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) { }

  public async validateUser(email: string, password: string) {
    const user = await this.prismaService.users.findUnique({ where: { email } });

    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password)) return null;

    const { password: pass, ...result } = user;

    return result;
  }

  public async login(user: Partial<User>) {
    const payload = { id: user.id, email: user.email };
    return { ...user, session_token: this.jwtService.sign(payload) };
  }
}