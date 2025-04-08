import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { ProductImage } from "./ProductImage ";
import { ReviewRating } from "./ReviewRating";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({
    type: "text",
    default: "No Description"
  })
  description!: string;

  @Column("decimal", { nullable: false })
  price!: number;
  
  @Column({
    type: "int",
    default: 0
  })
  stock!: number;

  @Column({ nullable: false, unique: true })
  sku!: string;



  @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
  category!: Category;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images!: ProductImage[];
  categoryId: any;

  @OneToMany(() => ReviewRating, (review) => review.product)
  review!: ReviewRating[];

  @OneToMany(() => CartItem, (cartitem) => cartitem.product)
  cartItem!: CartItem[];

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems!: OrderItem[];


}
