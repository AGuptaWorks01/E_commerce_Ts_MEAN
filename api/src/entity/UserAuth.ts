import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date
}