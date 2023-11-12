import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role, ROLES_KEY } from './decorators';
import { PrismaService } from '@database';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), context.getClass()
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const userRoles = await this.prismaService.users_roles.findMany({ where: { user: user.id }, select: { role_id: true } });
    const roleIds = userRoles.map(userRole => userRole.role_id);

    const roles = await this.prismaService.roles.findMany({ where: { id: { in: roleIds } } });
    user.roles = roles;

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}