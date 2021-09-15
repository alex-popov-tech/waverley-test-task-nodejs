export const addTasks = (app) => {
  app
    .get('/', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.rp.tasks().find();
      return reply.render('index', { data: { tasks } });
    });
};
