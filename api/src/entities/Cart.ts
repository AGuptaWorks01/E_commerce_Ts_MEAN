import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from "./User"
import { CartItem } from './CartItem';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column({
    //     type: "int",
    //     default: 0
    // })
    // quantity!: number

    // @Column("decimal", { precision: 10, scale: 2 })
    // totalAmount!: number;

    @ManyToOne(() => User, (user) => user.carts)
    user!: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items!: CartItem[]

}