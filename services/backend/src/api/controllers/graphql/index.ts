import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';

export const addGraphql = (app) => {
  const typeDefs = gql`

    type DeletionPayload {
      success: Boolean
    }

    type Task {
      id: Int
      name: String
    }

    type Query {
      task(id: ID!): Task
      tasks: [Task]
    }

    type Mutation {
      addTask(name: String!): Task
      updateTask(id: ID!, name: String!): Task
      deleteTask(id: ID!): DeletionPayload
    }

  `;
  const resolvers = {
    Query: {
      task: (_, { id }) => app.rp.tasks().findOne({ where: { id } }),
      tasks: () => app.rp.tasks().find(),
    },
    Mutation: {
      addTask: async (_, { name }) => {
        const task = app.rp.tasks().create();
        task.name = name;
        await app.rp.tasks().save(task);
        return task;
      },

      updateTask: async (_, { id, name }) => {
        const task = await app.rp.tasks().findOne({ where: { id } });
        task.name = name;
        await app.rp.tasks().save(task);
        return task;
      },

      deleteTask: async (_, { id }) => {
        await app.rp.tasks().delete(id);
        return { success: true };
      }
      ,
    },
  };
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
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin,
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  });
  server.start().then(() => app.register(server.createHandler()));
};
