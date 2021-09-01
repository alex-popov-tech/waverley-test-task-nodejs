import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const mode = process.env.NODE_ENV || 'development';

const common = {
  entities: [`${__dirname}/entities/*.js`],
  migrations: [`${__dirname}/migrations/*.js`],
  logging: true,
};

const configs = {
  test: {
    ...common,
    type: 'sqlite',
    database: ':memory:',
    synchronize: true
  },
  development: {
    ...common,
    synchronize: true,
    type: 'postgres',
    url: 'postgres://postgres:secret@localhost:5432/postgres',
  },
  production: {
    ...common,
    type: 'postgres',
    url: process.env.DATABASE_URL,
  },
};

export default configs[mode];