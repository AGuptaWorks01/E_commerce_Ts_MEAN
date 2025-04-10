import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from './User.Entitie';
import { Product } from './Product.Entitie'

@Entity()
export class ReviewRating {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, (product) => product.review)
    product!: Product;

    @ManyToOne(() => User, (user) => user.review)
    user!: User;

    @Column('float')
    rating!: number;

    @Column()
    comment!: string;

    @CreateDateColumn()
    createdAt!: Date;

}