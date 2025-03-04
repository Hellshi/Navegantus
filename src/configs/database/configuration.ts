import { registerAs } from '@nestjs/config';

import 'dotenv/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  db: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  migrationsRun: process.env.DATABASE_MIGRATERUN === 'true',
}));