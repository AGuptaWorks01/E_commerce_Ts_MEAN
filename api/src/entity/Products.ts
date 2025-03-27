import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductImage } from "./ProductImage ";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    sku!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Exclude()  // Prevent circular reference
    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images!: ProductImage[];

    @Expose()
    get imageUrls(): string[] {
        return this.images?.map(img => img.image_url) || [];
    }
}
