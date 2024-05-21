import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'mysql2/promise';

@Injectable()
export class MasiveVideoService {
  constructor(@Inject('MYSQL') private pool: Pool) {}

  async findAllData(): Promise<QueryResult> {
    const [data] = await this.pool.query(
      `SELECT * FROM datos_dispositivo_video`,
    );
    return data;
  }

  async createMasive(
    videos: {
      codigoDispositivo: string;
      codigoVideo: string;
      fechaHora: string;
    }[],
  ): Promise<object> {
    try {
      const sql = `INSERT INTO datos_dispositivo_video (codigo_dispositivo, codigo_video, fecha_hora_reproduccion) VALUES ?`;
      //query += `('${video.codigoDispositivo}','${video.codigoVideo}','${video.fechaHora}'),`;

      const value = videos.map((video) => [
        video.codigoDispositivo,
        video.codigoVideo,
        video.fechaHora,
      ]);

      await this.pool.query<QueryResult>(sql, [value]);

      return {
        inserts: 'success',
      };
    } catch (error) {
      return {
        inserts: error,
      };
    }
  }
}

/*
// src/video/video.service.ts
import { Injectable } from '@nestjs/common';
import { InjectMysql, Mysql } from '@nestjs/mysql';

@Injectable()
export class VideoService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async insertVideos(videos: { codigoDispositivo: string; codigoVideo: string; fechaHora: string; }[]): Promise<void> {
    const connection = await this.mysql.getConnection();

    const query = `
      INSERT INTO videos (codigoDispositivo, codigoVideo, fechaHora)
      VALUES ?
    `;

    const values = videos.map(video => [
      video.codigoDispositivo,
      video.codigoVideo,
      video.fechaHora,
    ]);

    await connection.query(query, [values]);
    connection.release();
  }
}
 */
