import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import compression from "compression";
import helmet from "helmet"; // Security HTTP headers
import morgan from "morgan"; // HTTP request logger
import responseTime from "response-time"; // Adds X-Response-Time header

import ProductRouter from "./routes/Product.Route";
import UserRouter from "./routes/Users.Route"

const app: Application = express();

// ================= Middleware Setup =================

// Secure HTTP headers to prevent common vulnerabilities
app.use(helmet());

// Compress all HTTP responses to reduce payload size
app.use(compression());

// Log all HTTP requests in development format
app.use(morgan("dev"));

// Add response time in headers for performance monitoring
app.use(responseTime());

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