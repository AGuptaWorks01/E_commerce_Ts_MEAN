import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products";
import { Exclude } from "class-transformer";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    image_url!: string;

    @Exclude()  
    @ManyToOne(() => Product, (product) => product.images)
    product!: Product
}