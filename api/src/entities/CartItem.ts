import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: Number

    @ManyToMany(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
    cart!: Cart

    @ManyToOne(() => Product, (product) => product.cartItem)
    product!: Product

    @Column({
        type: "int",
        default: 1
    })
    quantity!: number

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal!: number
}