import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CourseDTO } from './DTO/course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  //find all courses
  @Get()
  async findCourses(): Promise<any> {
    return await this.courseService.findAllCourses();
  }

  //find one course by id
  @Get(':id')
  async findCourse(@Param('id') id: string): Promise<any> {
    return await this.courseService.findOneCourse(id);
  }

  //create a course
  @Post()
  async createCourse(@Body() course: CourseDTO): Promise<any> {
    return await this.courseService.createCourse(course);
  }

  //update a course
  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() course: CourseDTO,
  ): Promise<any> {
    return await this.courseService.updateCourse(id, course);
  }

  //delete a course
  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<any> {
    return await this.courseService.deleteCourse(id);
  }
}
