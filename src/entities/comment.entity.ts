import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './articles.entity';
import { User } from './users.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  content: string;

  @Column()
  articleId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Article, (article) => article.Comment)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  Article: Article;

  @ManyToOne(() => User, (user) => user.Comment)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  User: User;
}
