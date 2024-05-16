import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      database: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
  };
});
