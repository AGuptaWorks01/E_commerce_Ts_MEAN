import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import { Payment } from "./Payment";
import { ShipingAddress } from "./ShipingAddress";

export enum Status {
    PENDING = "Placed",
    SHIPED = "Shiped",
    DELIVERED = "Delivered"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user) => user.orders)
    user!: User;

    @OneToMany(() => OrderItem, (item) => item.order)
    items!: OrderItem[];

    @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
    @JoinColumn()
    payment!: Payment;

    @OneToMany(() => ShipingAddress, (addr) => addr.order, { cascade: true })
    @JoinColumn()
    shippingAddress!: ShipingAddress;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING
    })
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;
}