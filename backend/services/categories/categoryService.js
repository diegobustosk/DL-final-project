import pool from "../pg.js";
import format from "pg-format";

const getCategories = async () => {
  const query = "SELECT * FROM Categories";
  const result = await pool.query(query);
  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = format(
    "SELECT * FROM Categories WHERE category_id = %L",
    categoryId
  );
  const result = await pool.query(query);
  return result.rows[0];
};

const createCategory = async (name, description) => {
  const insertQuery = format(
    "INSERT INTO Categories (name, description) VALUES (%L, %L) RETURNING *",
    name,
    description
  );
  const result = await pool.query(insertQuery);
  return result.rows[0];
};

const updateCategory = async (categoryId, name, description) => {
  const updateQuery = format(
    "UPDATE Categories SET name = %L, description = %L WHERE category_id = %L RETURNING *",
    name,
    description,
    categoryId
  );
  const result = await pool.query(updateQuery);
  return result.rows[0];
};

const deleteCategory = async (categoryId) => {
  const deleteQuery = format(
    "DELETE FROM Categories WHERE category_id = %L",
    categoryId
  );
  await pool.query(deleteQuery);
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
