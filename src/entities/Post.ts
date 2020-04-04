import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("posts")
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column({type: "varchar", unique: true})
    slug: string;

    @Column("text")
    body: string;

    @Column("boolean")
    draft: boolean;

    @CreateDateColumn()
    created_at: Date;
}
