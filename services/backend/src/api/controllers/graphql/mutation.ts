import { GraphQLObjectType } from "graphql";
import { createMutation as createTaskMutation } from './task';

export const createMutation = (app) => {
  const tasksMutations = createTaskMutation(app);
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      tasks: tasksMutations,
    },
  });
  return mutation;
};
