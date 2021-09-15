import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { FastifyInstance } from 'fastify';
import { GraphQLSchema as GQLSchema } from 'graphql';
import { createMutation } from './mutation';
import { createQuery } from './query';
const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);
    console.log(JSON.stringify(requestContext, null, '\t'))

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};
export const addGraphql = (app: FastifyInstance) => {
  const query = createQuery(app);
  const mutation = createMutation(app);
  const schema = new GQLSchema({ query, mutation});
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
      myPlugin,
      fastifyAppClosePlugin,
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  });
  server.start().then(() => app.register(server.createHandler()));
};
