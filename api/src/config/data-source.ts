import { DataSource } from "typeorm";
import { Product } from "../entities/Product.Entitie";
import { ProductImage } from "../entities/ProductImage.Entitie";
import dotenv from "dotenv";
import { User } from "../entities/User.Entitie";
import { Cart } from "../entities/Cart.Entitie";
import { CartItem } from "../entities/CartItem.Entitie";
import { Category } from "../entities/Category.Entitie";
import { Payment } from "../entities/Payment.Entitie";
import { ShipingAddress } from "../entities/ShipingAddress.Entitie";
import { ReviewRating } from "../entities/ReviewRating.Entitie";
import { Order } from "../entities/Order.Entitie";
import { OrderItem } from "../entities/OrderItem.Entitie";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", // defining  RDBMS
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Automatically creates tables based on entities
  logging: true,
  // ssl: {
  //   rejectUnauthorized: false, // Allowing self-signed certificates
  // },
  entities: [Product, ProductImage, User, Cart, CartItem, Category, Payment, ShipingAddress, ReviewRating, Order, OrderItem],
  migrations: [],
  subscribers: [],
});



