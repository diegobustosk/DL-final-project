import express from "express";
import { authenticateToken } from "./middlewares/authenticate.js";
import {
  addFavorite,
  getFavoritesByUserId,
  deleteFavorite,
} from "../services/favorites/favoriteService.js";

const favoritesRouter = express.Router();

favoritesRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const favorites = await getFavoritesByUserId(userId);
    res.json(favorites);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

favoritesRouter.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.user_id;
  const { productId } = req.body;

  try {
    await addFavorite(userId, productId);
    res.status(201).send("Product added to Favorites");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

favoritesRouter.delete("/:productId", authenticateToken, async (req, res) => {
  const userId = req.user.user_id;
  const productId = req.params.productId;

  try {
    await deleteFavorite(userId, productId);
    res.status(200).send("Product removed from favorites");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default favoritesRouter;
