import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum Status {
    PENDING = "Placed",
    SHIPED = "Shiped",
    DELIVERED = "Delivered"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING
    })
    status!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    totalAmount!: number;

    @CreateDateColumn()
    createAt!: Date;

    @ManyToMany(() => User, (user) => user.orders)
    user!: User;
    items: any;
    payment: any;
    shipingAddress: any;
}