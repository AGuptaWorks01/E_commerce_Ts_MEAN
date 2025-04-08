import express from "express";
import ProductController from "../controllers/Product.Controller"
import upload from "../middlewares/upload";
import { authMiddleWare } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", upload.array("images", 5), async (req, res) => {
    await ProductController.createProduct(req, res);
});

router.get("/", async (req, res) => {
    await ProductController.getProducts(req, res);
});

router.get("/:id", upload.array("images", 5), async (req, res) => {
    await ProductController.getProductById(req, res);
});

router.put("/:id", upload.array("images", 5), async (req, res) => {
    await ProductController.updateProduct(req, res);
});

router.delete("/:id", async (req, res) => {
    await ProductController.deleteProduct(req, res);
});

export default router;
