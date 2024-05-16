import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class AppService {
  constructor(@Inject('MYSQL') private pool: Pool) {}

  async getHello() {
    return { message: 'hello word' };
  }
}
