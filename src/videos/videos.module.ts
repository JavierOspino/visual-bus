import { Module } from '@nestjs/common';
import { VideoService } from './services/video.service';
import { VideoController } from './controller/video.controller';
import { MasiveVideoService } from './services/masive-video.service';

@Module({
  providers: [VideoService, MasiveVideoService],
  controllers: [VideoController]
})
export class VideosModule {}
