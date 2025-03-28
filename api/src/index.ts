import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "../src/routes/Product";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/api/products", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}, productRoutes);
AppDataSource.initialize().then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
}).catch(error => console.log(error));
