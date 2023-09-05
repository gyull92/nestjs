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
import { Sales } from './sales.entity';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  star: number;

  @Column({ default: null })
  userId: number;

  @Column({ default: null })
  productId: number;

  @Column({ default: null })
  salesId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.Review)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  User: User;

  @ManyToOne(() => Product, (product) => product.Review)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  Product: Product;

  @OneToOne(() => Sales, (sales) => sales.Review)
  @JoinColumn({ name: 'salesId', referencedColumnName: 'id' })
  Sales: Sales;
}
