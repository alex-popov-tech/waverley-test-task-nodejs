import { GraphQLObjectType } from 'graphql';
import { createQuery as createTasksQuery } from './task';

export const createQuery = (app) => {
  const tasks = createTasksQuery(app);
  return new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      tasks: { type: tasks },
    }),
  });
};
