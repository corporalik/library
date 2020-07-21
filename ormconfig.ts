import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { join } from 'path';
const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_SCHEMA,
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '/**/**.entity{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/{.ts,*.js}')],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migration',
  },
};

export = config;
