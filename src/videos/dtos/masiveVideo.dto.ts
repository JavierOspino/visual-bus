import { IsArray, IsString } from 'class-validator';

class VideoData {
  @IsString()
  readonly codigoDispositivo: string;

  @IsString()
  readonly codigoVideo: string;

  @IsString()
  readonly fechaHora: string;
}

export class CreateMasiveVideosDto {
  @IsArray()
  readonly videos: VideoData[];
}
