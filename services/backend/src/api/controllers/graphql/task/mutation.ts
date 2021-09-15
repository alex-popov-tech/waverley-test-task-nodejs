import { GraphQLString, GraphQLNonNull as GQLNonNull, GraphQLObjectType as GQLObject } from 'graphql';
import { DeleteTaskPayload, Task } from './types';

export const createMutation = (app) => new GQLObject({
  name: 'MutateTasks',
  fields: {
    add: {
      type: Task,
      args: { name: { type: new GQLNonNull(GraphQLString) } },
      resolve: async (_, { name }) => {
        const task = await app.rp.tasks().create().init({ name });
        await app.rp.tasks().save(task);
        return task;
      },
    },
    update: {
      type: Task,
      args: {
        id: { type: new GQLNonNull(GraphQLString) },
        name: { type: new GQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id, name }) => {
        const task = await app.rp.tasks().findOne({ where: { id } });
        task.name = name;
        await app.rp.tasks().save(task);
        return task;
      },
    },
    delete: {
      type: DeleteTaskPayload,
      args: { id: { type: new GQLNonNull(GraphQLString) } },
      resolve: async (_, { id }) => app.rp.tasks().delete(id)
        .then(() => ({ success: true }))
        .catch((err) => ({ success: false, err })),
    },
  },
});
