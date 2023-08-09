import { IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    @IsString()
    image: string;

    @Column({default: null})
    @IsString()
    myself: string;

    @Column({default: 0})
    @IsNumber()
    subscriber: number;

    @Column({default: 0})
    @IsNumber()
    like: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => User, (user) => user.Profile)
    User: User;
}