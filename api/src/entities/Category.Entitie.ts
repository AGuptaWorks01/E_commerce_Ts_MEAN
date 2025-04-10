import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product.Entitie';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({
        type: "text",
        default: "No Description"
    })
    description!: string;

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];
}
