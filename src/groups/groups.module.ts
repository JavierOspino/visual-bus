import { Module } from '@nestjs/common';
import { GroupController } from './controller/group.controller';
import { GroupService } from './services/group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupsModule {}
