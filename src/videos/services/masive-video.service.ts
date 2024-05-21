import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'mysql2/promise';
import { CreateMasiveVideosDto } from '../dtos/masiveVideo.dto';
type Video = {
  codigoDispositivo: string;
  codigoVideo: string;
  fechaHora: string;
};
@Injectable()
export class MasiveVideoService {
  constructor(@Inject('MYSQL') private pool: Pool) {}

  async findAllData(): Promise<QueryResult> {
    const [data] = await this.pool.query(
      `SELECT * FROM datos_dispositivo_video`,
    );
    return data;
  }

  async createMasive(payload: CreateMasiveVideosDto): Promise<object> {
    let query = '';
    try {
      payload.map((video: Video) => {
        query += `('${video.codigoDispositivo}','${video.codigoVideo}','${video.fechaHora}'),`;
      });

      const sql = `INSERT INTO datos_dispositivo_video (codigo_dispositivo, codigo_video, fecha_hora_reproduccion) VALUES ${query}`;

      const [response] = await this.pool.query<QueryResult>(
        sql.slice(0, sql.length - 1),
      );

      return {
        inserts: response['affectedRows'],
      };
    } catch (error) {
      console.log({ error });
      return error;
    }
  }
}
