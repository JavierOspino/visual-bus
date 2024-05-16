import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  readonly referencia: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly estado: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly sincronizar: number;

  @IsString()
  @IsNotEmpty()
  readonly codigo: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id_cliente: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly grupos_id: number;
}
export class UpdateDateDeviceDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;
}

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
