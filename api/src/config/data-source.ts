import { DataSource } from "typeorm";
import { Product } from "../entity/Product";
import { ProductImage } from "../entity/ProductImage ";
import dotenv from "dotenv";
import { User } from "../entity/User";

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
  entities: [Product, ProductImage, User],
  migrations: [],
  subscribers: [],
});



