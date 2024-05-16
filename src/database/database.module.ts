import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config';
import { Pool, createPool } from 'mysql2/promise';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'MYSQL',
      useFactory: async (
        configService: ConfigType<typeof config>,
      ): Promise<Pool> => {
        const { host, port, user, password, database } = configService.database;
        return createPool({ host, user, password, database, port });
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MYSQL'],
})
export class DatabaseModule {}
