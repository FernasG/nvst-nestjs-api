import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateUserDto, FindAllUsersDto, UpdateUserDto } from './users.interface';
import { UsersService } from './users.service';
import { Public } from '@auth';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  @Public()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll(@Query() params: FindAllUsersDto) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updataUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updataUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
