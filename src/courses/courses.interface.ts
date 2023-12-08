export interface CreateCourseDto {
  name: string;
  description: string;
  duration: number;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> { }

export class FindAllCoursesDto {
  skip?: number;
  take?: number;
}