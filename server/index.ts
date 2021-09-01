import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import fastifyFormbody from 'fastify-formbody';
import fastifyMethodOverride from 'fastify-method-override-wrapper';
import fastifyQs from 'fastify-qs';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifySensible from 'fastify-sensible';
import fastifyStatic from 'fastify-static';
import fastifyTypeOrm from 'fastify-typeorm-plugin';
import fastifyWebpackHMR from 'fastify-webpack-hmr';
import _ from 'lodash';
import path from 'path';
import pointOfView from 'point-of-view';
import pug from 'pug';
import qs from 'qs';
import ormConfig from './ormconfig';
import addRoutes from './routes';

dotenvConfig();

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
      config: `${__dirname}/../webpack.config.js`,
    });
  }
  // if (isProduction) {
  //   app.register(fastifyStatic, {
  //     root: `${__dirname}/../assets`,
  //     prefix: '/assets',
  //   });
  // }
};
const addPlugins = (app) => {
  app.register(fastifySensible);
  app.register(fastifyFormbody, { parser: (str) => qs.parse(str) });
  app.register(fastifyQs, {});
  app.register(fastifyReverseRoutes);
};
const addDatabase = (app) => {
  app.register(fastifyTypeOrm, ormConfig);
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
  addDatabase(app);

  return app;
};
