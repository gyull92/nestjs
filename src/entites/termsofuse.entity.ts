import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class TermsOfUse extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'boolean', default: '1' })
    terms: boolean;

    @Column({ type: 'boolean', default: '1' })
    location: boolean;

    @Column({ type: 'boolean', default: '1' })
    accept: boolean;

    @ManyToOne(() => User, (user) => user.TermsOfUse)
    User: User;
}