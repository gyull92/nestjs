import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.Sales)
  @JoinColumn({ name: 'consumerId', referencedColumnName: 'id' })
  Consumer: User[];

  @ManyToOne(() => Product, (product) => product.Sales)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  Product: Product[];

  @OneToOne(() => Review, (review) => review.Sales, { cascade: true })
  @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
  Review: Review;
}
