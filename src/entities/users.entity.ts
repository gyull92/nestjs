import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './articles.entity';
import { Comment } from './comment.entity';
import { Product } from './product.entity';
import { Review } from './review.entity';
import { Sales } from './sales.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column({ default: 0 })
  role: number;

  @Column({ default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Article, (article) => article.User, { onDelete: 'CASCADE' })
  Article: Article[];

  @OneToMany(() => Comment, (comment) => comment.User, { onDelete: 'CASCADE' })
  Comment: Comment[];

  @OneToMany(() => Product, (product) => product.Seller)
  Product: Product[];

  @OneToMany(() => Review, (review) => review.User)
  Review: Review[];

  @ManyToMany(() => Sales, (sales) => sales.Consumer)
  Sales: Sales[];
}
