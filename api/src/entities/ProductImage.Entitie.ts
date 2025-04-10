import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.Entitie";
import { Exclude } from "class-transformer";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
    product!: Product
}
