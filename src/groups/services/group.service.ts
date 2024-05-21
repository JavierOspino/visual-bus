import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult, ResultSetHeader } from 'mysql2/promise';
import { CreateGroupDto, UpdateGroupDto } from '../dtos/groups.dto';

@Injectable()
export class GroupService {
  constructor(@Inject('MYSQL') private pool: Pool) {}

  async findAll(): Promise<QueryResult> {
    const [groups] = await this.pool.query('SELECT * FROM grupos');
    return groups;
  }

  async findOne(id: number): Promise<object | QueryResult> {
    const sql: string = `SELECT * FROM grupos WHERE id = ${id}`;
    const [group] = await this.pool.query<QueryResult>(sql);
    if (!group[0]) {
      return {
        message: 'Id incorrecto',
      };
    }
    return group[0];
  }

  async create(group: CreateGroupDto): Promise<number> {
    const sql = `INSERT INTO grupos (Nombre, Estado, Codigo) VALUES ('${group.nombre}','${group.estado}', 
                '${group.codigo}')`;
    const [response] = await this.pool.query<QueryResult>(sql);
    return response['affectedRows'];
  }

  async update(id: number, data: UpdateGroupDto): Promise<object | string> {
    const index = await this.findOne(id);
    if (!index) {
      return 'Group not found!';
    }
    const sql: string = `UPDATE grupos SET nombre = '${data.nombre}', estado = '${data.estado}', codigo = '${data.codigo}' WHERE id = '${id}'`;

    const [response] = await this.pool.query<ResultSetHeader>(sql);

    if (response.affectedRows == 1) {
      return { response: true };
    }
    return { response: false };
  }

  async remove(id: number): Promise<string> {
    const index = await this.findOne(id);

    if (!index) {
      return 'Group not found!';
    }
    const [response] = await this.pool.query(
      `UPDATE grupos SET Estado = 0 WHERE id = '${id}'`,
    );
    return response['affectedRows'] > 0
      ? 'Group deleted!'
      : 'Error deleting group!';
  }
}
