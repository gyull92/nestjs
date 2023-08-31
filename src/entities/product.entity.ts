import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Review } from './review.entity';
import { Sales } from './sales.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  content: string;

  @Column({ default: null })
  price: number;

  @Column({ default: 0 })
  count: number;

  @Column()
  sellerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId', referencedColumnName: 'id' })
  Seller: User;

  @OneToMany(() => Review, (review) => review.Product)
  Review: Review[];

  @OneToMany(() => Sales, (sales) => sales.Product)
  Sales: Sales[];
}
