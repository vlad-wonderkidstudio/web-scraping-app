import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const dbConfig = {
  type: 'mongodb' as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  authSource: process.env.DB_AUTH_SOURCE,
};

export const mongoConfig: TypeOrmModuleOptions = {
  ...dbConfig,
};

// On the case if there will be migrations
export const appDataSource = new DataSource({
  ...dbConfig,
  migrations: ['migrations/*.ts'],
});
