import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

class VideoData {
  @IsString()
  readonly codigoDispositivo: string;

  @IsString()
  readonly codigoVideo: string;

  @IsString()
  readonly fechaHora: string;
}

export class CreateMasiveVideosDto {
  [x: string]: any;
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  videos: VideoData[];
}
