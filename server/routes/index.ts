import { Task } from '../entities/task';

export default (app) => {
  app
    .get('/', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.orm.getRepository(Task).createQueryBuilder('task').getMany();
      return reply.render('index', { data: { tasks } });
    })
    .post('/', { name: 'createTask' }, async (req, reply) => {
      const { body: { name } } = req;
      await app.orm.createQueryBuilder().insert().into(Task).values({ name }).execute();
      return reply.redirect(app.reverse('tasks'));
    })
    .delete('/:id', { name: 'deleteTask' }, async (req, reply) => {
      const { params: { id } } = req;
      await app.orm.createQueryBuilder().delete().from(Task).where('id = :id', { id }).execute();
      return reply.redirect(app.reverse('tasks'));
    })
    .patch('/:id', { name: 'patchTask' }, async (req, reply) => {
      const { params: { id } } = req;
      return reply.redirect(app.reverse('tasks'));
    });
};
