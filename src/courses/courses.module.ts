import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { Course, CourseSchema } from './schema/course.schema';
import { Video, VideoSchema } from './videos/schema/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [CoursesController, VideosController],
  providers: [CoursesService, VideosService],
})
export class CoursesModule {}
