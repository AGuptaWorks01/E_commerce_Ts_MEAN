import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class ShipingAddress {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column()
    addressLine1!: string;

    @Column({ nullable: true })
    addressLine2!: string;
    
    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    postalCode!: string;

    @Column()
    country!: string;

    @ManyToOne(() => User, (user) => user.addresses)
    user!: User;

    @OneToOne(() => Order, (order) => order.shippingAddress)
    order!: Order;
}