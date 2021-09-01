import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: string
}
