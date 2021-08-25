import dotenv from 'dotenv';
import qs from 'qs';
import fs from 'fs';
import fastify from 'fastify';
import fastifyQs from 'fastify-qs';
import fastifyFormbody from 'fastify-formbody';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifyMethodOverride from 'fastify-method-override-wrapper';
import fastifySensible from 'fastify-sensible';
import fastifyStatic from 'fastify-static';
import fastifyWebpackHMR from 'fastify-webpack-hmr';
import _ from 'lodash';
import path from 'path';
import pointOfView from 'point-of-view';
import pug from 'pug';
import addRoutes from './routes';

dotenv.config();

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';
const isProduction = mode === 'production';

const addTemplatesEngine = (app) => {
  app.register(pointOfView, {
    engine: {
      pug,
    },
    includeViewExtension: true,
    root: path.join(__dirname, 'views'),
    defaultContext: {
      route: (name, args, options) => app.reverse(name, args, options),
    },
  });
  app.decorateReply('render', async function render(viewPath, locals) {
    return this.view(viewPath, {
      ...locals,
      reply: this,
    });
  });
};
const addAssets = (app) => {
  if (isDevelopment) {
    app.register(fastifyWebpackHMR, {
      config: path.join(__dirname, '..', 'webpack.config.js'),
    });
  }
  if (isProduction) {
    app.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'assets'),
      prefix: '/assets',
    });
  }
};
const addPlugins = (app) => {
  app.register(fastifySensible);
  app.register(fastifyFormbody, { parser: (str) => qs.parse(str) });
  app.register(fastifyQs, {});
  app.register(fastifyReverseRoutes);
};
const addSeeds = (app) => {
  const rawCsv = fs.readFileSync(path.join(__dirname, '..', 'test_data.csv'));
  const tasks = rawCsv.toString()
    .split('\n')
    .filter((it) => !!it)
    .map((line) => line.split(','))
    .map(([id, name, delayInSec]) => ({
      id, name, startedAt: null, delayInMs: parseInt(delayInSec, 10) * 1000,
    }));
  app.decorate('data', { tasks });
};
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
  addPlugins(app);
  addTemplatesEngine(app);
  addAssets(app);
  addRoutes(app);
  addSeeds(app);

  return app;
};
