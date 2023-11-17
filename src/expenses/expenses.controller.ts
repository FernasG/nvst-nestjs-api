import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateExpenseDto, FindAllExpensesDto, UpdateExpenseDto } from './expenses.interface';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  public async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  public async findAll(@Query() findAllExpensesDto: FindAllExpensesDto) {
    return this.expensesService.findAll(findAllExpensesDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
