import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Exclude } from "class-transformer";

@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @Exclude()
    @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
    product!: Product
}
