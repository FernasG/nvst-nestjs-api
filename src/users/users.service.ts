import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma, users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(data: Prisma.usersCreateInput): Promise<users> {
    return this.prismaService.users.create({ data });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.users.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy
    });
  }

  public async findOne(userWhereUniqueInput: Prisma.usersWhereUniqueInput): Promise<users | null> {
    return this.prismaService.users.findUnique({ where: userWhereUniqueInput });
  }

  public async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    return this.prismaService.users.update({ data, where });
  }

  public async remove(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return this.prismaService.users.delete({ where });
  }
}
