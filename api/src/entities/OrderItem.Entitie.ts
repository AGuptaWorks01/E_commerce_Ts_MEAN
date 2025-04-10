import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product.Entitie";
import { Order } from "./Order.Entitie";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
    order!: Order;

    @ManyToOne(() => Product, (product) => product.orderItems)
    product!: Product;

    @Column('int')
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    // @ManyToOne(() => Product, { eager: true })
    // product!: Product;

}
