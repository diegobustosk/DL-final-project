import pool from "../pg.js";
import format from "pg-format";

const getFavoritesByUserId = async (userId) => {
  const query = format("SELECT * FROM Favorites WHERE user_id = %L", userId);
  const result = await pool.query(query);
  return result.rows;
};

const addFavorite = async (userId, productId) => {
  const insertQuery = format(
    "INSERT INTO Favorites (user_id, product_id) VALUES (%L, %L)",
    userId,
    productId
  );
  await pool.query(insertQuery);
};

const deleteFavorite = async (userId, productId) => {
  const deleteQuery = format(
    "DELETE FROM Favorites WHERE user_id = %L AND product_id = %L",
    userId,
    productId
  );
  await pool.query(deleteQuery);
};

export { getFavoritesByUserId, addFavorite, deleteFavorite };
