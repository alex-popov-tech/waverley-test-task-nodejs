import { Length, validateOrReject } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Length(5, 20)
  @Column('varchar')
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  async from({ name }): Promise<Task> {
    const task = new Task();
    task.name = name;

    return validateOrReject(task)
    .then(() => task);
  }
}
