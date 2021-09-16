import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Task } from './types';

export const createQuery = (app) => ({
        type: new GraphQLObjectType({
          name: 'QueryTasks',
          fields: () => ({
            find: {
              type: Task,
              args: { id: { type: new GraphQLNonNull(GraphQLID) } },
              resolve: (_source, { id }) => app.rp.tasks().findOne({ where: { id } }),
            },
            all: {
              type: new GraphQLList(Task),
              args: { },
              resolve: async () => app.rp.tasks().find(),
            },
          }),
        }),
        resolve: () => ({})
      });
