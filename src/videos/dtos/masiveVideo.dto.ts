import { IsArray } from 'class-validator';
//import { Type } from 'class-transformer';

/* type Video = {
  codigoDispositivo: string;
  codigoVideo: string;
  fechaHora: string;
}; */

/* class VideoData {
  @IsString()
  readonly codigoDispositivo: string;

  @IsString()
  readonly codigoVideo: string;

  @IsString()
  readonly fechaHora: string;
} */

export class CreateMasiveVideosDto {
  @IsArray()
  readonly videos: string[];
}
