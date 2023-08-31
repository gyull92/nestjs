import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Comment } from './comment.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  title: string;

  @Column({ default: null })
  content: string;

  @Column({ default: null, type: 'text' })
  image: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.Article)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  User: User;

  @OneToMany(() => Comment, (comment) => comment.Article, {
    onDelete: 'CASCADE',
  })
  Comment: Comment[];
}
