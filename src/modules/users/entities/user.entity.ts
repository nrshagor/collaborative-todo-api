import { AppMember } from 'src/modules/app-member/entities/app-member.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { ToDoApp } from 'src/modules/to-do-app/entities/to-do-app.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

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

  // Relations
  @OneToMany(() => ToDoApp, (todoApp) => todoApp.owner)
  owned_apps: ToDoApp[];

  @OneToMany(() => AppMember, (member) => member.user)
  memberships: AppMember[];

  @OneToMany(() => Task, (task) => task.created_by)
  created_tasks: Task[];
}
