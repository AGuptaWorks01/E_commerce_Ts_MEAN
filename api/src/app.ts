import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import compression from "compression";
import ProductRouter from "./routes/Product.Route";
import UserRouter from "./routes/Users.Route"

const app: Application = express();

// Enable compression
app.use(compression());

// CORS Config (Can be extended for whitelist in prod)
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files (e.g. images, docs)
app.use("/api/uploads", express.static("uploads"));

// Product Routes
app.use("/api/products", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
}, ProductRouter);

// Auth Routes
app.use("/api/auth", UserRouter);

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "error",
        message: `Route '${req.originalUrl}' not found.`,
    });
});

export default app;