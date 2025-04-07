import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    PaymentMethod!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    amount!: number;

    @Column()
    status!: string;

    @OneToOne(() => Order, (order) => order.payment)
    order!: Order

}