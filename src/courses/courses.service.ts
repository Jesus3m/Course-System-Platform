import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDTO } from './DTO/course.dto';
import { Course, CourseDocument } from './schema/course.schema';

@Injectable()
export class CoursesService {
  course: CourseDocument;
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  //find all courses in the BD
  async findAllCourses(): Promise<Course[]> {
    try {
      return this.courseModel.find().exec();
    } catch (error) {
      throw new HttpException('Course list not found', HttpStatus.NOT_FOUND);
    }
  }

  // create course
  async createCourse(course: CourseDTO): Promise<string> {
    try {
      const newCourse = new this.courseModel(course);
      newCourse.save();
      return 'Course created successfully';
    } catch (error) {
      throw new HttpException(
        'Course not could be created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //update course
  async updateCourse(id: string, course: CourseDTO): Promise<string> {
    try {
      await this.courseModel.findByIdAndUpdate(id, course);
      return 'Course was updated';
    } catch (error) {
      throw new HttpException(
        'Course not could be updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //delete course
  async deleteCourse(id: string): Promise<string> {
    try {
      await this.courseModel.findByIdAndDelete(id);
      return 'Course was deleted';
    } catch (error) {
      throw new HttpException(
        'Course not could be deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //Find one course
  async findOneCourse(id: string): Promise<Course> {
    try {
      return this.courseModel.findById(id);
    } catch (error) {
      throw new HttpException(
        'Course not could be found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
