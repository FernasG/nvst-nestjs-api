import { Injectable } from '@nestjs/common';
import { Prisma, revenues } from '@prisma/client';
import { PrismaService } from 'src/database';

@Injectable()
export class RevenuesService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(data: Prisma.revenuesCreateInput): Promise<revenues> {
    return this.prismaService.revenues.create({ data });
  }

  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.revenuesWhereUniqueInput;
    where?: Prisma.revenuesWhereInput;
    orderBy?: Prisma.revenuesOrderByWithRelationInput;
  }): Promise<revenues[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.revenues.findMany({
      skip,
      take,
      where,
      cursor,
      orderBy
    });
  }

  public async findOne(revenueWhereUniqueInput: Prisma.revenuesWhereUniqueInput): Promise<revenues | null> {
    return this.prismaService.revenues.findUnique({ where: revenueWhereUniqueInput });
  }

  public async update(params: {
    where: Prisma.revenuesWhereUniqueInput;
    data: Prisma.revenuesUpdateInput;
  }): Promise<revenues> {
    const { where, data } = params;
    return this.prismaService.revenues.update({ data, where });
  }

  public async remove(where: Prisma.revenuesWhereUniqueInput): Promise<revenues> {
    return this.prismaService.revenues.delete({ where });
  }
}
