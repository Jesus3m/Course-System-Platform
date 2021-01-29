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
import { VideoDTO } from './DTO/video.DTO';
import { VideosService } from './videos.service';
@ApiTags('courses/videos')
@Controller('/:courseID/videos')
export class VideosController {
  constructor(private videoService: VideosService) {}
  // Get all videos of a course
  @Get()
  async findVideosOfCourse(@Param('courseID') courseID: string): Promise<any> {
    return await this.videoService.findVideosOfCourse(courseID);
  }
  // Create a video
  @Post()
  async createVideo(
    @Body() video: VideoDTO,
    @Param('courseID') courseId: string,
  ): Promise<any> {
    return await this.videoService.createVideo(video, courseId);
  }
  // Update a video
  @Put(':id')
  updateVideo(
    @Param('id') id: string,
    @Param('courseID') courseID: string,
    @Body() video: VideoDTO,
  ): any {
    return this.videoService.updateVideo(id, courseID, video);
  }
  // Delete video
  @Delete(':id')
  deleteVideo(
    @Param('id') id: string,
    @Param('courseID') courseID: string,
  ): any {
    return this.videoService.DeleteVideo(id, courseID);
  }
}
