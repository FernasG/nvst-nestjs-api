import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto, FindAllCoursesDto } from './courses.interface'
import { PrismaService } from '@database';

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(createCourseDto: CreateCourseDto) {
    const { name, description, duration } = createCourseDto;

    const courseExists = await this.prismaService.courses.findFirst({ where: { name } });

    if (courseExists) throw new BadRequestException('Course with this name already exists.');

    const data = { name, description, duration };

    const course = await this.prismaService.courses.create({ data });

    if (!course) throw new InternalServerErrorException('Failed to create course.');

    return course;
  }

  public async findAll(findAllCoursesDto: FindAllCoursesDto) {
    const { skip, take } = findAllCoursesDto;
    const courses = await this.prismaService.courses.findMany({ skip, take });

    return courses;
  }

  public async findOne(courseId: number) {
    const course = await this.prismaService.courses.findUnique({ where: { id: courseId } });

    if (!course) throw new NotFoundException('Course not found.');

    return course;
  }

  public async update(courseId: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.prismaService.courses.findUnique({ where: { id: courseId } });

    if (!course) throw new NotFoundException('Course not found.');

    const { name, description, duration } = updateCourseDto;

    const data: UpdateCourseDto = {};

    if (name) data.name = name;
    if (duration) data.duration = duration;
    if (description) data.description = description;

    return this.prismaService.courses.update({ where: { id: courseId }, data });
  }

  public async remove(courseId: number) {
    const course = await this.prismaService.courses.findUnique({ where: { id: courseId } });

    if (!course) throw new NotFoundException('Course not found.');

    return this.prismaService.courses.delete({ where: { id: courseId } });
  }
}
