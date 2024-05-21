import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  readonly codigo: string;

  @IsString()
  @IsNotEmpty()
  readonly referencia: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly estado: number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly url: string;
}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
