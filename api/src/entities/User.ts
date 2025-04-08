import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Order } from "./Order"
import { Cart } from "./Cart"
import { ReviewRating } from './ReviewRating';
import { ShipingAddress } from './ShipingAddress';

export enum Role {
    USER = "user",
    SELLER = "seller",
    ADMIN = "admin"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    // @Column({ type: 'int', default: 1 })
    // isActive!: number;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role!: Role;

    @OneToMany(() => Cart, (cart) => cart.user)
    carts!: Cart[];

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => ReviewRating, (review) => review.user)
    review!: ReviewRating[];

    @OneToMany(() => ShipingAddress, (address) => address.user)
    addresses!: ShipingAddress[];
}