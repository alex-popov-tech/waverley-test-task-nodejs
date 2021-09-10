import fastifyTypeOrm from 'fastify-typeorm-plugin';
import path from 'path';
import { Task } from '../../domain/entities';

export const addRepositories = (app, mode) => {
  if (mode === 'production') {
    process.env.TYPEORM_ENTITIES = path.resolve(__dirname, '..', '..', '..', 'backend/domain/entities/*.js');
    process.env.TYPEORM_MIGRATIONS = path.resolve(__dirname, '..', '..', '..', 'backend/data/migrations/*.js');
  }
  console.log(Object.entries(process.env).filter(([name]) => name.includes('TYPEORM')).sort());
  app.register(fastifyTypeOrm);
  app.decorate('rp', {
    tasks: () => app.orm.getRepository(Task),
  });
};
