import { GraphQLString, GraphQLNonNull, GraphQLObjectType as GQLObject } from 'graphql';

export const Error = new GQLObject({
  name: 'error',
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});
