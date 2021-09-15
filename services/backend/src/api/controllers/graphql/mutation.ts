import { GraphQLObjectType } from 'graphql';
import { createMutation as createTasksMutation } from './task';

export const createMutation = (app) => {
  const tasks = createTasksMutation(app);
  return new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      tasks: { type: tasks },
    },
  });
};
