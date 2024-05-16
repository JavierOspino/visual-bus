import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DevicesService } from '../services/devices.service';
import { CreateDeviceDto, UpdateDateDeviceDto } from '../dtos/device.dto';
import { QueryResult } from 'mysql2';

@Controller('devices')
export class DevicesController {
  constructor(private deviceService: DevicesService) {}

  @Get()
  getAll(): Promise<QueryResult> {
    return this.deviceService.findAll();
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<object | QueryResult> {
    return this.deviceService.findOne(id);
  }

  @Get(':code/:password')
  findByCode(
    @Param('code') code: string,
    @Param('code') password: string,
  ): Promise<string | QueryResult> {
    return this.deviceService.findByCode(code, password);
  }

  @Post()
  create(@Body() payload: CreateDeviceDto): Promise<number> {
    return this.deviceService.create(payload);
  }

  @Put('date/:code')
  updateDate(@Param('code') code: string, @Body() date: UpdateDateDeviceDto) {
    return this.deviceService.updateDate(code, date);
  }
}
