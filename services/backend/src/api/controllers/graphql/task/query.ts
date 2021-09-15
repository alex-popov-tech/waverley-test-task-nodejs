import {
  GraphQLString, GraphQLList as GQLList,
  GraphQLNonNull as GQLNonNull, GraphQLObjectType as GQLObject,
} from 'graphql';
import { Task } from './types';

export const createQuery = (app) => new GQLObject({
  name: 'QueryTasks',
  fields: () => ({
    find: {
      type: Task,
      args: { id: { type: new GQLNonNull(GraphQLString) } },
      resolve: (_source, { id }) => app.rp.tasks().findOne({ where: { id } }),
    },
    all: {
      type: new GQLList(Task),
      args: { },
      resolve: async () => app.rp.tasks().find(),
    },
  }),
});
