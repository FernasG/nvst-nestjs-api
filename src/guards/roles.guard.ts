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
    return true;

    // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    //   context.getHandler(), context.getClass()
    // ]);

    // if (!requiredRoles) return true;

    // const { user } = context.switchToHttp().getRequest();

    // const userRoles = await this.datasource.getRepository(UsersRoles).find({ where: { user_id: user.id }, select: ['role_id'] });
    // const roleIds = userRoles.map(userRole => userRole.role_id);

    // const roles = await this.datasource.getRepository(Roles).find({ where: { id: In(roleIds) } });
    // user.roles = roles;

    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}