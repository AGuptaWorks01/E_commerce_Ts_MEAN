import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entity/Products";
import { ProductImage } from "../entity/ProductImage ";
import { plainToClass } from "class-transformer";

class ProductController {
  // ✅ Create Product
  static async createProduct(req: Request, res: Response) {
    try {
      const { sku, name, price } = req.body;

      if (!sku || !name || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check for duplicate SKU
      const existingProduct = await AppDataSource.manager.findOne(Product, {
        where: { sku },
      });
      if (existingProduct) {
        return res.status(409).json({ error: "SKU already exists" });
      }

      const product = new Product();
      product.sku = sku;
      product.name = name;
      product.price = parseFloat(price);

      // Handle image uploads
      const imagePaths = req.files
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];

      const imageEntities = imagePaths.map((path) => {
        const image = new ProductImage();
        image.image_url = path;
        image.product = product;
        return image;
      });

      product.images = imageEntities;

      await AppDataSource.manager.save(product);

      // Convert to plain object to avoid circular reference
      const plainProduct = plainToClass(Product, product);
      res.status(201).json({
        message: "Product created successfully",
        product: plainProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  }

  // ✅ Get all products
  static async getProducts(req: Request, res: Response) {
    try {
      const baseUrl = "http://localhost:3000/"; // Adjust this to match your server's URL
      // Fetch products with images in a single query
      const products = await AppDataSource.manager.find(Product, {
        relations: ["images"],
      });

      // Map images to full URLs for each product in a single pass
      const mappedProducts = products.map((product) => ({
        ...product,
        images: product.images.map((image) => ({
          ...image,
          image_url: baseUrl + image.image_url, // Prepend base URL to image paths
        })),
      }));

      res.status(200).json(mappedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching products" });
    }
  }

  // ✅ Get product by ID
  static async getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const product = await AppDataSource.manager.findOne(Product, {
        where: { id },
        relations: ["images"],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching product" });
    }
  }

  // Update product

  static async updateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { sku, name, price } = req.body;

    try {
      const product = await AppDataSource.manager.findOne(Product, {
        where: { id },
        relations: ["images"],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product fields
      product.sku = sku || product.sku;
      product.name = name || product.name;
      product.price = parseFloat(price) || product.price;

      // Handle image updates
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        // Remove old images
        await AppDataSource.manager.remove(ProductImage, product.images);

        // Add new images
        const imagePaths = (req.files as Express.Multer.File[]).map((file) => file.path);

        const newImages = imagePaths.map((path) => {
          const image = new ProductImage();
          image.image_url = path;
          image.product = product;
          return image;
        });

        product.images = newImages;
      }

      await AppDataSource.manager.save(product);

      // ✅ Convert to plain object to avoid circular reference
      const plainProduct = plainToClass(Product, product);

      res.status(200).json({
        message: "Product updated successfully",
        product: plainProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product" });
    }
  }


  // ✅ Delete product
  static async deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const product = await AppDataSource.manager.findOne(Product, {
        where: { id },
        relations: ["images"],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await AppDataSource.manager.remove(ProductImage, product.images);
      await AppDataSource.manager.remove(product);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting product" });
    }
  }
}

export default ProductController;
