import { GraphQLObjectType } from "graphql";
import { createQuery as createTaskQuery } from "./task";

export const createQuery = (app) => {
  const tasksQueries = createTaskQuery(app);
  const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      tasks: tasksQueries,
    },
  });
  return query;
};
