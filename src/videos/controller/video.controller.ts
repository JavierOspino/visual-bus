import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { QueryResult } from 'mysql2';
import { MasiveVideoService } from '../services/masive-video.service';
import { CreateVideoDto, UpdateVideoDto } from '../dtos/video.dto';
import { CreateMasiveVideosDto } from '../dtos/masiveVideo.dto';

@Controller('video')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private masiveVideoService: MasiveVideoService,
  ) {}

  @Get()
  getAll(): Promise<QueryResult> {
    return this.videoService.findAll();
  }

  @Post('/sincronization')
  createMasive(@Body() payload: CreateMasiveVideosDto[]) {
    console.log(payload);
    return this.masiveVideoService.createMasive(payload);
  }

  @Get('/sincronization/all')
  getData(): Promise<QueryResult> {
    return this.masiveVideoService.findAllData();
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<object | QueryResult> {
    return this.videoService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateVideoDto): Promise<number> {
    return this.videoService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVideoDto,
  ): Promise<object | string> {
    return this.videoService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.videoService.remove(id);
  }
}
