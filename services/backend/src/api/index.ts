import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import fastifyMethodOverride from 'fastify-method-override-wrapper';
import _ from 'lodash';
import 'reflect-metadata';
import { addControllers } from './controllers';
import { addPlugins, addRepositories } from './helpers';

dotenvConfig();

const mode = process.env.NODE_ENV.toLowerCase() === 'production' ? 'production' : 'development';

const createLoggedApp = () => {
  const app = fastifyMethodOverride(fastify)({
    logger: {
      serializers: {
        req: (it) => _.pick(it, 'method', 'url', 'query'),
        res: (it) => _.pick(it, 'statusCode'),
      },
    },
  });
  app.addHook('preHandler', async (req) => {
    if (req.body) {
      req.log.info({ body: req.body });
    }
  });
  return app;
};

export default () => {
  const app = createLoggedApp();
  addPlugins(app, mode);
  addRepositories(app, mode);
  addControllers(app);
  return app;
};
