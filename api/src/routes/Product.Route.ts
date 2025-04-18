import express from "express";
import upload from "../middlewares/upload";
import { ProductController } from "../controllers/Product.Controller"
import { authMiddleWare, authorizeRoles } from "../middlewares/verifyToken";

const router = express.Router();

// router.post("/", upload.array("images", 5), async (req, res, next) => {
//     await ProductController.createProduct(req, res, next);
// });

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


router.use('/add', authMiddleWare, authorizeRoles('admin', 'seller'))
router.post('/add', ProductController.createProduct)


export default router;