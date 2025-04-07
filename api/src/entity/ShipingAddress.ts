import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class ShipingAddress {
    find(arg0: (address: any) => boolean) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.shipingAddress, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()  // Foreign key ko specify karne ke liye
    user!: User;

    @Column()
    address!: string;

    @Column()
    city!: string;

    @Column()
    zipCode!: number;

    @Column()
    country!: number;

    @OneToOne(() => Order, (order) => order.shipingAddress)
    order!: Order;


}