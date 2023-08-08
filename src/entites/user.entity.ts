import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, OneToMany } from "typeorm";
import { Article } from "./article.entity";
import { Comment } from "./comment.entity";

@Entity()
export class User extends BaseEntity {
    @ApiProperty({
        example: 1,
        description: '유저 아이디'
    })
    @IsNumber()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty({
        example: '홍길동',
        description: '유저 이름'
    })
    @IsNotEmpty()
    @IsString()
    @Column({ unique: true })
    name: string;

    @ApiProperty({
        example: 'qwe123',
        description: '유저 비밀번호'
    })
    @IsNotEmpty()
    @IsString()
    @Column()
    password: string;

    @ApiProperty({
        example: '01012341234',
        description: '유저 연락처'
    })
    @IsString()
    @Column({ unique: true })
    phone: string;

    @ApiProperty({
        example: '부산광역시 사하구 신평동',
        description: '유저 주소'
    })
    @IsString()
    @Column()
    address: string;

    @ApiProperty({
        example: 'asd@naver.com',
        description: '유저 이메일'
    })
    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: '닉네임',
        description: '유저 닉네임'
    })
    @IsNotEmpty()
    @IsString()
    @Column()
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedeAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Article, (article) => article.User)
    Article: Article[];

    @OneToMany(() => Comment, (comment) => comment.User)
    Comment: Comment[];
}