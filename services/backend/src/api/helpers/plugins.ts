import fastifyFormbody from 'fastify-formbody';
import fastifyQs from 'fastify-qs';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifySensible from 'fastify-sensible';
import fastifyStatic from 'fastify-static';
import fastifyWebpackHMR from 'fastify-webpack-hmr';
import path from 'path';
import pointOfView from 'point-of-view';
import pug from 'pug';
import qs from 'qs';

const addTemplatesEngine = (app) => {
  app.register(pointOfView, {
    engine: {
      pug,
    },
    includeViewExtension: true,
    root: path.join(__dirname, '..', 'views'),
    defaultContext: {
      reverse: (name, args, options) => app.reverse(name, args, options),
    },
  });
  app.decorateReply('render', async function render(viewPath, locals) {
    return this.view(viewPath, {
      ...locals,
      reply: this,
    });
  });
};

const addAssets = (app, mode) => {
  if (mode === 'development') {
    app.register(fastifyWebpackHMR, {
      config: path.join(__dirname, '..', '..', '..', '..', 'frontend/webpack.config.js'),
    });
  }
  if (mode === 'production') {
    app.register(fastifyStatic, {
      root: path.join(__dirname, '..', '..', '..', 'assets'),
      prefix: '/assets',
    });
  }
};

export const addPlugins = (app, mode) => {
  addTemplatesEngine(app);
  addAssets(app, mode);

  app.register(fastifySensible);
  app.register(fastifyFormbody, { parser: (str) => qs.parse(str) });
  app.register(fastifyQs);
  app.register(fastifyReverseRoutes);
};
