import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@database';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  public async signIn(email: string, password: string) {
    const user = await this.prismaService.users.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('User not found.');

    const { password: hashedPassword, ...userSafeData } = user;

    const comparePassword = bcrypt.compareSync(password, hashedPassword);

    if (!comparePassword) throw new UnauthorizedException('Unable to Sign In');

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { ...userSafeData, access_token: accessToken };
  }
}
