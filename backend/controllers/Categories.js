import express from "express";
import { authenticateToken } from "./middlewares/authenticate.js";
import { authRole } from "./middlewares/authorization.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categories/categoryService.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

categoriesRouter.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

categoriesRouter.post(
  "/",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    const { name, description } = req.body;
    try {
      const newCategory = await createCategory(name, description);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

categoriesRouter.put(
  "/:categoryId",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    try {
      const updatedCategory = await updateCategory(
        categoryId,
        name,
        description
      );
      if (!updatedCategory) {
        return res.status(404).send("Category not found");
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

categoriesRouter.delete(
  "/:categoryId",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    const { categoryId } = req.params;
    try {
      await deleteCategory(categoryId);
      res.status(200).send("Category deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

export default categoriesRouter;
