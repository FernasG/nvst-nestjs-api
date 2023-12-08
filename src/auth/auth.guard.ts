import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const { headers: { authorization } } = request;
    const token = this.extractTokenFromHeader(authorization);

    if (!token) throw new UnauthorizedException('Invalid request.');

    const jwtSecret = this.configService.get<string>('jwt_options.secret');
    const payload = await this.jwtService.verifyAsync(token, { secret: jwtSecret }).catch(_ => null);

    if (!payload) throw new UnauthorizedException('Invalid request.');

    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}