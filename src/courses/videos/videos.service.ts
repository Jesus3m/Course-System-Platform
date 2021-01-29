import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schema/course.schema';
import { VideoDTO } from './DTO/video.DTO';
import { Video, VideoDocument } from './schema/video.schema';

@Injectable()
export class VideosService {
  video: VideoDocument;
  course: CourseDocument;
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  // Find videos of a course
  async findVideosOfCourse(id: string): Promise<any> {
    try {
      const courseFound = await this.courseModel.findById(id);
      const videoList = await this.videoModel.find({ course: id });
      if (videoList.length > 0) {
        const course = {
          name: courseFound.name,
          teacher: courseFound.teacher,
          videos: videoList,
        };
        return course;
      } else {
        throw new HttpException(
          'the video list could not be found, but the course id dont exists',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        'the video list could not be found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  //create video inserting the courseID
  async createVideo(video: VideoDTO, courseID: string): Promise<any> {
    try {
      const courseFound = await this.courseModel.find({
        _id: { $in: courseID },
      });
      if (courseFound.length > 0) {
        const newVideo = new this.videoModel(video);
        newVideo.course = courseID;
        await newVideo.save();
        return 'Video was created on course: ' + courseFound[0].name;
      } else {
        throw new HttpException(
          'the video could not be created but the course id dont exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        'the video could not be created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // Update Video
  async updateVideo(
    id: string,
    CourseID: string,
    video: VideoDTO,
  ): Promise<string> {
    try {
      const courseFound = await this.courseModel.findById(CourseID);
      const videoFound = await this.videoModel.findById(id);
      if (videoFound.course == courseFound._id) {
        await this.videoModel.findByIdAndUpdate(id, video);
        return 'The video was updated';
      } else {
        throw new HttpException(
          'The video was not found or does not belong to this course',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        'The video could not be updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // Delete video
  async DeleteVideo(id: string, courseID: string): Promise<any> {
    try {
      const courseFound = await this.courseModel.findById(courseID);
      const videoFound = await this.videoModel.findById(id);
      if (videoFound.course == courseFound._id) {
        await this.videoModel.findByIdAndDelete(id);
        return 'The video was deleted';
      } else {
        throw new HttpException(
          'The video was not found or does not belong to this course',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        'The video could not be deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
