import { GraphQLID, GraphQLNonNull as GQLNonNull, GraphQLObjectType as GQLObject, GraphQLString } from 'graphql';
import { DeleteTaskPayload, Task } from './types';

export const createMutation = (app) => ({ resolve: () => ({}), type: new GQLObject({
  name: 'MutateTasks',
  fields: {
    add: {
      type: Task,
      args: { name: { type: new GQLNonNull(GraphQLString) } },
      resolve: async (_, { name }) => {
        const task = await app.rp.tasks().create().from({ name });
        await app.rp.tasks().save(task);
        return task;
      },
    },
    update: {
      type: Task,
      args: {
        id: { type: new GQLNonNull(GraphQLID) },
        name: { type: new GQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id, name }) => {
        const existingTask = await app.rp.tasks().findOne({ where: { id } });
        const updatedTask = await app.rp.tasks().create().from({ ...existingTask, name });
        await app.rp.tasks().save(updatedTask);
        return updatedTask;
      },
    },
    delete: {
      type: DeleteTaskPayload,
      args: { id: { type: new GQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => app.rp.tasks().delete(id)
        .then(() => ({ success: true }))
        .catch((err) => ({ success: false, err })),
    },
  },
})});
