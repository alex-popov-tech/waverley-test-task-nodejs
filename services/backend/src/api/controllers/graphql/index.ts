import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { GraphQLSchema } from 'graphql';
import { createQuery } from './query';
import { createMutation } from './mutation';

export const addGraphql = (app) => {
  const query = createQuery(app);
  const mutation = createMutation(app);
  const schema = new GraphQLSchema({ query, mutation });

  const fastifyAppClosePlugin = ({
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  });
  const server = new ApolloServer({
    schema,
    plugins: [
      fastifyAppClosePlugin,
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  });
  server.start().then(() => app.register(server.createHandler()));
};
