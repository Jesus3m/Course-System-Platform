import { ApiProperty } from '@nestjs/swagger';
export class VideoDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  url: string;
}
