import { addGraphql } from './graphql';
import { addTasks } from './tasks';

export const addControllers = (app) => {
  addTasks(app);
  addGraphql(app);
};
