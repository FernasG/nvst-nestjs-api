import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateRevenueDto, FindAllRevenuesDto, UpdateRevenueDto } from './revenues.interface';
import { RevenuesService } from './revenues.service';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) { }

  @Post()
  create(@Body() createRevenueDto: CreateRevenueDto) {
    return this.revenuesService.create(createRevenueDto);
  }

  @Get()
  findAll(@Query() findAllRevenueDto: FindAllRevenuesDto) {
    return this.revenuesService.findAll(findAllRevenueDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenuesService.update(+id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuesService.remove(+id);
  }
}
