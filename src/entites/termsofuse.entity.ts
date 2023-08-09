import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class TermsOfUse extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiPropertyOptional({description: '서비스 이용약관'})
    @Column({ type: 'boolean', default: '1' })
    terms: boolean;

    @ApiPropertyOptional({description: '위치서비스 이용약관'})
    @Column({ type: 'boolean', default: '1' })
    location: boolean;

    @ApiPropertyOptional({description: '운영정책 동의'})
    @Column({ type: 'boolean', default: '1' })
    accept: boolean;

    @ManyToOne(() => User, (user) => user.TermsOfUse)
    User: User;
}