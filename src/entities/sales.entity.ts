import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Product } from './product.entity';
import { Review } from './review.entity';

@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  productId: number;

  @Column({ unique: false })
  consumerId: number;

  @Column({ default: null, unique: false })
  reviewId: number;

  @Column({ default: null })
  sellerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => User, (user) => user.Sales)
  @JoinColumn({ name: 'consumerId', referencedColumnName: 'id' })
  Consumer: User[];

  @ManyToMany(() => Product, (product) => product.Sales)
  @JoinTable()
  Product: Product[];

  @OneToOne(() => Review, (review) => review.Sales, { cascade: true })
  @JoinTable()
  Review: Review;
}
