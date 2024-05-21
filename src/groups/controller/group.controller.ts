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
import { GroupService } from '../services/group.service';
import { QueryResult } from 'mysql2';
import { CreateGroupDto, UpdateGroupDto } from '../dtos/groups.dto';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  getAll(): Promise<QueryResult> {
    return this.groupService.findAll();
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<object | QueryResult> {
    return this.groupService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateGroupDto): Promise<number> {
    return this.groupService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateGroupDto,
  ): Promise<string | object> {
    return this.groupService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.groupService.remove(id);
  }
}
