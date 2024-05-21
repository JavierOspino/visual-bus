import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly estado: string;

  @IsString()
  @IsNotEmpty()
  readonly codigo: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
