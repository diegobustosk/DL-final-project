import express from "express";
import {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  getProductsByCategoryId,
} from "../services/products/productService.js";
import { authenticateToken } from "./middlewares/authenticate.js";
import { authRole } from "./middlewares/authorization.js";

const productRouter = express.Router();

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).send("Product not found");
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

productRouter.post(
  "/",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    try {
      const newProduct = await createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

productRouter.put(
  "/:id",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    try {
      await updateProduct(req.params.id, req.body);
      res.status(200).send("Product updated successfully");
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

productRouter.delete(
  "/:id",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    try {
      await deleteProduct(req.params.id);
      res.status(200).send("Product deleted successfully");
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

productRouter.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await getProductsByCategoryId(categoryId);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default productRouter;
