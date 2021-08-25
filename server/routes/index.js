export default (app) => {
  app
    .get('/', { name: 'tasks' }, async (req, reply) => {
      const { query: { running } } = req;
      const runningTasks = running ? app.data.tasks.filter(({ startedAt }) => startedAt) : [];
      return reply.render('index', { data: { tasks: app.data.tasks, runningTasks } });
    })
    .patch('/:id', { name: 'patchTask' }, async (req, reply) => {
      const { params: { id } } = req;
      const task = app.data.tasks.find((it) => it.id === id);
      task.startedAt = Date.now();
      setTimeout(() => { task.startedAt = null; }, task.delayInMs);
      return reply.redirect(app.reverse('tasks'));
    });
};
