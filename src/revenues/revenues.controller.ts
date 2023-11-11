import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateRevenueDto, FindAllRevenuesDto, UpdateRevenueDto } from './revenues.interface';
import { RevenuesService } from './revenues.service';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) { }

  @Post()
  public async create(@Body() createRevenueDto: CreateRevenueDto) {
    return this.revenuesService.create(createRevenueDto);
  }

  @Get()
  public async findAll(@Query() findAllRevenueDto: FindAllRevenuesDto) {
    return this.revenuesService.findAll(findAllRevenueDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.revenuesService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenuesService.update(+id, updateRevenueDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.revenuesService.remove(+id);
  }
}
