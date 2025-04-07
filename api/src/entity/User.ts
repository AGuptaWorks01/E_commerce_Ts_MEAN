import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn } from 'typeorm';
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

    @Column({ type: 'int', default: 1 })
    isActive!: number;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role!: Role;

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts!: Cart[];

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;

    @OneToMany(() => ReviewRating, (review) => review.user)
    review!: ReviewRating[];

    @OneToMany(() => ShipingAddress, (shipingAddress) => shipingAddress.user)
    shipingAddress!: ShipingAddress;
}