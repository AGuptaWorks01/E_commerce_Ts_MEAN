import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product'

@Entity()
export class ReviewRating {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.review)
    user!: User;

    @ManyToOne(() => Product, (product) => product.review)
    product!: Product;

    @Column()
    rating!: number;

    @Column({
        type: "text"
    })
    review!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}