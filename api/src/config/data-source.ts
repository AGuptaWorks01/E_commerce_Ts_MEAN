import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { ProductImage } from "../entities/ProductImage ";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Category } from "../entities/Category";
import { Payment } from "../entities/Payment";
import { ShipingAddress } from "../entities/ShipingAddress";
import { ReviewRating } from "../entities/ReviewRating";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", // defining  RDBMS
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Automatically creates tables based on entities
  logging: false,
  // ssl: {
  //   rejectUnauthorized: false, // Allowing self-signed certificates
  // },
  entities: [Product, ProductImage, User, Cart, CartItem, Category, Payment, ShipingAddress, ReviewRating, Order, OrderItem],
  migrations: [],
  subscribers: [],
});



