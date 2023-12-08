import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto, FindAllCoursesDto } from './courses.interface';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  public async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  public async findAll(@Query() findAllCoursesDto: FindAllCoursesDto) {
    return this.coursesService.findAll(findAllCoursesDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
