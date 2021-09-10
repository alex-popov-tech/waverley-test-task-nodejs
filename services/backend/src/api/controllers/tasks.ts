export const addTasks = (app) => {
  app
    .get('/', { name: 'tasks' }, async (req, reply) => {
  console.log(Object.entries(process.env).filter(([name]) => name.includes('TYPEORM')).sort());
      const tasks = await app.rp.tasks().find();
      return reply.render('index', { data: { tasks } });
    });
};
