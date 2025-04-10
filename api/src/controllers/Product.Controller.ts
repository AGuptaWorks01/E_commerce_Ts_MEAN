import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.Entitie";
import { ProductImage } from "../entities/ProductImage.Entitie";
import { plainToClass } from "class-transformer";
import path from "path";
import fs from 'fs'

class ProductController {
  // Create Product
  static async createProduct(req: Request, res: Response) {
    try {
      const { sku, name, price, description } = req.body;

      if (!sku || !name || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check for duplicate SKU
      const existingProduct = await AppDataSource.manager.findOne(Product, {
        where: { sku },
      });
      // console.log(existingProduct);

      if (existingProduct) {
        return res.status(409).json({ error: "SKU already exists" });
      }

      const product = new Product();
      product.sku = sku;
      product.name = name;
      product.price = parseFloat(price);
      product.description = description;

      // console.log("product aya", product);

      // Handle image uploads
      const imagePaths = req.files ? (req.files as Express.Multer.File[]) : [];
      // .map((file) => file.filename)       : [];
      // console.log("req.files aya", req.files);
      // console.log("imagePaths aya", imagePaths);

      const imageEntities = imagePaths.map((name) => {
        const image = new ProductImage();
        image.url = `/uploads/${name.filename}`;
        // console.log("path save ", image.image_url);
        image.product = product
        return image;
      });
      // console.log("image enitites is here", imageEntities);


      product.images = imageEntities;
      await AppDataSource.manager.save(product);

      // Convert to plain object to avoid circular reference
      const plainProduct = plainToClass(Product, product);
      // console.log("plainProduct", plainProduct);

      res.status(201).json({
        message: "Product created successfully",
        product: plainProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  }

  //  Get all products
  static async getProducts(req: Request, res: Response) {
    try {
      debugger;
      const products = await AppDataSource.manager.find(Product, {
        relations: ["images"],
      });
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  }

  //  Get product by ID
  static async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
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

    try {
      const id = parseInt(req.params.id);
      const { sku, name, price, description } = req.body;
      const files = req.files as Express.Multer.File[];

      const product = await AppDataSource.manager.findOne(Product, {
        where: { id },
        relations: ["images"],
      });
      // console.log(product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product fields
      product.sku = sku || product.sku;
      product.name = name || product.name;
      product.price = parseFloat(price) || product.price;
      product.description = description || product.description;
      // console.log(product.sku);

      // Handle image updates
      if (files && files.length > 0) {
        console.log("New images uploaded. Deleting old images...");

        for (const oldImage of product.images) {
          // const oldImagePath = path.join(__dirname, "..", oldImage.image_url);
          const oldImagePath = path.join(process.cwd(), "uploads", path.basename(oldImage.url))

          console.log("Checking file path:", oldImagePath);

          if (fs.existsSync(oldImagePath)) {
            fs.unlink(oldImagePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Deleted old image:", oldImagePath);
              }
            });
          } else {
            console.warn("File not found:", oldImagePath);
          }
        }

        // Remove old images
        await AppDataSource.manager.remove(ProductImage, product.images);

        // Add new images
        const imagePaths = (req.files as Express.Multer.File[])
        // .map((file) => file.filename);
        console.log("ImagePaths is for update", imagePaths);

        const newImages = imagePaths.map((file) => {
          const image = new ProductImage();
          image.url = `/uploads/${file.filename}`;
          image.product = product;
          // console.log("image", image);
          return image;
        });
        console.log(newImages);

        product.images = newImages;
      }

      await AppDataSource.manager.save(product);

      // const plainProduct = plainToClass(Product, product);

      res.status(200).json({
        message: "Product updated successfully",
        // product: plainProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product" });
    }
  }


  //  Delete product  
  static async deleteProduct(req: Request, res: Response) {

    try {
      const id = parseInt(req.params.id);
      const product = await AppDataSource.manager.findOne(Product, {
        where: { id },
        relations: ["images"],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      for (const image of product.images) {
        // const imagePath = path.join(__dirname, "..", image.image_url)


        const oldImagePath = path.join(process.cwd(), "uploads", path.basename(image.url))
        console.log("Image path is ", oldImagePath);

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Deleted image:", oldImagePath);
            }
          })
        } else {
          console.warn(" File not found:", oldImagePath);
        }
      }

      for (const image of product.images) {
        await AppDataSource.manager.delete(ProductImage, { id: image.id });
      }

      await AppDataSource.manager.remove(product);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting product" });
    }
  }
}

export default ProductController;
