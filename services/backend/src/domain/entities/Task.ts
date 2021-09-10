import { Length } from 'class-validator';
import { Column, UpdateDateColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
