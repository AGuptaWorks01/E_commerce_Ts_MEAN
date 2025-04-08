import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Order, (order) => order.payment)
    order!: Order

    @Column()
    PaymentMethod!: string;
    
    @Column()
    status!: string;
    
    @Column("decimal", { precision: 10, scale: 2 })
    amount!: number;

}