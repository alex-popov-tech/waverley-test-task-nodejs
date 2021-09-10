export default (app) => ({
  Query: {
    task: (_, { id }) => ({}),//app.repositories.tasks.find({ where: { id } }),
    tasks: () => ({}),//app.app.repositories.tasks.find(),
  },
  Mutation: {
    addTask: async (_, { name }) => {
      return {}
      // await app.orm.createQueryBuilder().insert().into(Task).values({ name })
      //   .execute();
      // return app.orm.getRepository(Task).createQueryBuilder('task').where('task.name = :name', { name }).getOne();
    },
    updateTask: async (_, { id, name }) => {
      return {}
      // await app.orm.createQueryBuilder().update(Task).set({ name }).where('tasks.id = :id', { id })
      //   .execute();
      // return app.orm.getRepository(Task).createQueryBuilder('task').where('task.id = :id', { id }).getOne();
    },
    deleteTask: async (_, { id }) => ({})//app.orm.createQueryBuilder().delete().from(Task).where('tasks.id = :id', { id })
      // .execute()
      // .then(() => ({ success: true }))
      // .catch(() => ({ success: true })),
  },
});
