import {Table, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Table("posts")
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("string")
    title: string;

    @Column({type: "string", unique: true})
    slug: string;

    @Column("text")
    body: string;

    @CreateDateColumn()
    created_at: Date;
}