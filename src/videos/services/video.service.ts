import { Inject, Injectable } from '@nestjs/common';
import { QueryResult, Pool, ResultSetHeader } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { CreateVideoDto, UpdateVideoDto } from '../dtos/video.dto';

@Injectable()
export class VideoService {
  constructor(@Inject('MYSQL') private pool: Pool) {}

  async findAll(): Promise<QueryResult> {
    const [videos] = await this.pool.query('SELECT * FROM videos');
    return videos;
  }

  async findOne(id: number): Promise<object | QueryResult> {
    const sql: string = `SELECT * FROM videos WHERE id = ${id}`;
    const [video] = await this.pool.query<QueryResult>(sql);
    if (!video[0]) {
      return {
        message: 'id incorrecto',
      };
    }
    return video[0];
  }

  async encriptedPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(video: CreateVideoDto): Promise<number> {
    const sql = `INSERT INTO videos 
                (codigo, referencia, estado, 
                 nombre, url) VALUES ('${video.codigo}','${video.referencia}',
                 0, '${video.nombre}', '${video.url}')`;
    const [response] = await this.pool.query<QueryResult>(sql);
    return response['affectedRows'];
  }
  async update(id: number, change: UpdateVideoDto): Promise<object | string> {
    const video = await this.findOne(id);

    if (!video) {
      return 'Video not found!';
    }
    const sql: string = `UPDATE videos SET 
                           codigo = '${change.codigo}',
                           referencia = '${change.referencia}',
                           estado = '${change.estado}',
                           nombre = '${change.nombre}',
                           url = '${change.url}'
                           WHERE id = '${id}'`;
    const [response] = await this.pool.query<ResultSetHeader>(sql);

    if (response.affectedRows == 1) {
      return { response: 'Video actualizada' };
    } else {
      return { response: 'Video no actualizada' };
    }
  }
  async remove(id: number): Promise<string> {
    const index = await this.findOne(id);

    if (!index) {
      return 'Video not found!';
    }

    const [response] = await this.pool.query(
      `UPDATE videos SET estado = 0 WHERE id = '${id}'`,
    );

    return response['affectedRows'] > 0
      ? 'Video deleted!'
      : 'Error deleting video!';
  }
}
