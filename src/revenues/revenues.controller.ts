import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { Prisma } from '@prisma/client';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) { }

  @Post()
  create(@Body() data: Prisma.revenuesCreateInput) {
    return this.revenuesService.create(data);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.revenuesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenuesService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.revenuesUpdateInput) {
    return this.revenuesService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuesService.remove({ id: +id });
  }
}
