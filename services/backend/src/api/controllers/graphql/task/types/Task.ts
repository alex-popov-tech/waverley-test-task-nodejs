import { GraphQLString, GraphQLNonNull as GQLNonNull, GraphQLObjectType as GQLObject } from 'graphql';

export const Task = new GQLObject({
  name: 'Task',
  fields: () => ({
    id: { type: new GQLNonNull(GraphQLString) },
    name: { type: new GQLNonNull(GraphQLString) },
  }),
});
