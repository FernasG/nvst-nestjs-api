import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto, FindAllExpensesDto, UpdateExpenseDto } from './expenses.interface';
import { PrismaService } from '@database';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(createExpenseDto: CreateExpenseDto) {
    const { title, description, category, payment, date, user_id, value } = createExpenseDto;

    const user = await this.prismaService.users.findUnique({ where: { id: user_id } });

    if (!user) throw new NotFoundException('User not found.');

    const parsedDate = new Date(date).toISOString();
    const data = { title, description, category, payment, user_id, value, date: parsedDate };

    const expense = await this.prismaService.expenses.create({ data });

    if (!expense) throw new InternalServerErrorException('Failed to create expense.');

    return expense;
  }

  public async findAll(findAllExpensesDto: FindAllExpensesDto) {
    const { user_id, skip, take } = findAllExpensesDto;

    const user = await this.prismaService.users.findUnique({ where: { id: +user_id } });

    if (!user) throw new NotFoundException('User not found.');

    return this.prismaService.expenses.findMany({ where: { user_id: +user_id }, take, skip });;
  }

  public async findOne(id: number) {
    const expense = await this.prismaService.expenses.findUnique({ where: { id } });

    if (!expense) throw new NotFoundException('Expense not found.');

    return expense;
  }

  public async update(expenseId: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.prismaService.expenses.findUnique({ where: { id: expenseId } });

    if (!expense) throw new NotFoundException('Expense not found.');

    const { title, description, category, date, payment, value } = updateExpenseDto;

    const data: UpdateExpenseDto = {};

    if (title) data.title = title;
    if (date) data.date = new Date(date).toISOString();
    if (payment) data.payment = payment;
    if (category) data.category = category;
    if (value && value > 0) data.value = value;
    if (description) data.description = description;

    return this.prismaService.expenses.update({ data, where: { id: expenseId } });
  }

  public async remove(expenseId: number) {
    const expense = await this.prismaService.expenses.findUnique({ where: { id: expenseId } });

    if (!expense) throw new NotFoundException('Expense not found.');

    return this.prismaService.expenses.delete({ where: { id: expenseId } });
  }
}
