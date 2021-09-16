import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createMutation, createQuery } from './task';

export const addGraphql = (app) => {
  const tasksQueries = createQuery(app);
  const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      tasks: tasksQueries,
    },
  });

  const tasksMutations = createMutation(app);
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      tasks: tasksMutations,
    },
  });

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
