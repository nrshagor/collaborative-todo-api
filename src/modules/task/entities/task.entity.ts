import { ToDoApp } from 'src/modules/to-do-app/entities/to-do-app.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ToDoApp, (app) => app.tasks, { onDelete: 'CASCADE' })
  todoApp: ToDoApp;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['in-progress', 'stale', 'completed'],
    default: 'in-progress',
  })
  status: 'in-progress' | 'stale' | 'completed';

  @Column({ nullable: true, type: 'date' })
  due_date?: Date;

  @Column({ nullable: true, type: 'int' })
  priority?: number;

  @ManyToOne(() => User, (user) => user.created_tasks, { nullable: true })
  created_by?: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
