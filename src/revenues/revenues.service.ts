import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRevenueDto, FindAllRevenuesDto, UpdateRevenueDto } from './revenues.interface';
import { PrismaService } from '@database';

@Injectable()
export class RevenuesService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(createRevenueDto: CreateRevenueDto) {
    const { title, description, recurrence, user_id, value } = createRevenueDto;

    const user = await this.prismaService.users.findUnique({ where: { id: user_id } });

    if (!user) throw new NotFoundException('User not found.');

    if (!['monthly', 'daily', 'weekly'].includes(recurrence)) throw new BadRequestException('Invalid recurrence parameter.');

    if (value < 1) throw new BadRequestException('Invalid value parameter');

    const data = { title, description, recurrence, user_id, value };

    return this.prismaService.revenues.create({ data });
  }

  public async findAll(findAllRevenueDto: FindAllRevenuesDto) {
    const { skip, take, user_id } = findAllRevenueDto;

    const user = await this.prismaService.users.findUnique({ where: { id: +user_id } });

    if (!user) throw new NotFoundException('User not found.');

    return this.prismaService.revenues.findMany({ skip, take, where: { user_id: +user_id } });
  }

  public async findOne(revenueId: number) {
    const revenue = await this.prismaService.revenues.findUnique({ where: { id: revenueId } });

    if (!revenue) throw new NotFoundException('Revenue not found.');

    return revenue;
  }

  public async update(revenueId: number, updateRevenueDto: UpdateRevenueDto) {
    const revenue = await this.prismaService.revenues.findUnique({ where: { id: revenueId } });

    if (!revenue) throw new NotFoundException('Revenue not found.');

    const { title, description, recurrence, value } = updateRevenueDto;

    const data: UpdateRevenueDto = {};

    if (title) data.title = title;
    if (value && value > 0) data.value = value;
    if (description) data.description = description;
    if (recurrence && ['monthly', 'daily', 'weekly'].includes(recurrence)) data.recurrence = recurrence;

    return this.prismaService.revenues.update({ data, where: { id: revenueId } });
  }

  public async remove(revenueId: number) {
    const revenue = await this.prismaService.revenues.findUnique({ where: { id: revenueId } });

    if (!revenue) throw new NotFoundException('Revenue not found.');

    return this.prismaService.revenues.delete({ where: { id: revenueId } });
  }
}
