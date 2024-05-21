import { IsString } from 'class-validator';
//import { Type } from 'class-transformer';

export class CreateMasiveVideosDto {
  @IsString()
  readonly codigoDispositivo: string;

  @IsString()
  readonly codigoVideo: string;

  @IsString()
  readonly fechaHora: string;
}

/* export class CreateMasiveVideosDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VideoData)
  videos: VideoData[];
} */
