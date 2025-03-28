import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entity/Products";
import { ProductImage } from "../entity/ProductImage ";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({

    type: "postgres",  // defining  RDBMS
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,  // Automatically creates tables based on entities
    logging: true,
    entities: [Product, ProductImage], 
    migrations: [],
    subscribers: [],
});