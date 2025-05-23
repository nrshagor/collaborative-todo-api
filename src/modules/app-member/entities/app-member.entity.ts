import { ToDoApp } from 'src/modules/to-do-app/entities/to-do-app.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('app_members')
@Unique(['user', 'todoApp'])
export class AppMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ToDoApp, (app) => app.members, { onDelete: 'CASCADE' })
  todoApp: ToDoApp;

  @Column({
    type: 'enum',
    enum: ['viewer', 'editor', 'owner'],
    default: 'viewer',
  })
  role: 'viewer' | 'editor' | 'owner';

  @CreateDateColumn()
  invited_at: Date;

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
