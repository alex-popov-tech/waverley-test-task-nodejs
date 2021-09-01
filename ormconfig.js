const dotenv = require('dotenv');

dotenv.config();
// import { config as dotenvConfig } from 'dotenv';
// dotenvConfig();
const mode = process.env.NODE_ENV || 'development';

const common = {
  entities: [`${__dirname}/dist/server/entities/*.js`],
  migrations: [`${__dirname}/dist/server/migrations/*.js`],
  logging: true,
};

const configs = {
  development: {
    ...common,
    type: 'postgres',
    url: 'postgres://postgres@localhost:5432/postgres',
  },
  production: {
    ...common,
    type: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
    url: process.env.DATABASE_URL,
  },
};

console.log(mode, configs[mode]);
module.exports = configs[mode];
// export default configs[mode];
