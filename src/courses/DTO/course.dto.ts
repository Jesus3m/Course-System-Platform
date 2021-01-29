import { ApiProperty } from '@nestjs/swagger';
export class CourseDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  teacher: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  duration: number;
}
