import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal!: number;

    @ManyToOne(() => Product, { eager: true })
    product!: Product;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
    order!: Order;
}
