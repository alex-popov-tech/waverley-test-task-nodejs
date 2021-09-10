import { EntityRepository, Repository } from "typeorm";
import { Task } from "../../domain/entities";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
}
