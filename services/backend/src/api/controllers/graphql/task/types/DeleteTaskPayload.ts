import {
  GraphQLBoolean, GraphQLNonNull as GQLNonNull, GraphQLObjectType as GQLObject,
} from 'graphql';
import { Error } from './Error';

export const DeleteTaskPayload = new GQLObject({
  name: 'DeleteTaskPayload',
  fields: {
    success: { type: new GQLNonNull(GraphQLBoolean) },
    error: { type: Error },
  },
});
