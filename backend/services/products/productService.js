import pool from "../pg.js";
import format from "pg-format";

const createProduct = async ({
  productName,
  description,
  price,
  stock,
  categoryId,
  primary_img_url,
}) => {
  const query = format(
    "INSERT INTO Products (product_name, description, price, stock, category_id, primary_img_url) VALUES (%L, %L, %L, %L, %L, %L) RETURNING product_id;",
    productName,
    description,
    price,
    stock,
    categoryId,
    primary_img_url
  );

  const result = await pool.query(query);
  return result.rows[0];
};

const getProductById = async (productId) => {
  const query = format(
    "SELECT * FROM Products WHERE product_id = %L",
    productId
  );
  const result = await pool.query(query);
  if (result.rows.length === 0) {
    throw new Error("Product not found");
  }
  return result.rows[0];
};

const getAllProducts = async () => {
  const query = "SELECT * FROM Products";
  const result = await pool.query(query);
  return result.rows;
};

const updateProduct = async (
  productId,
  { productName, description, price, stock, categoryId }
) => {
  const query = format(
    "UPDATE Products SET product_name = %L, description = %L, price = %L, stock = %L, category_id = %L WHERE product_id = %L",
    productName,
    description,
    price,
    stock,
    categoryId,
    productId
  );

  await pool.query(query);
};

const deleteProduct = async (productId) => {
  const query = format("DELETE FROM Products WHERE product_id = %L", productId);
  await pool.query(query);
};

const getProductsByCategoryId = async (categoryId) => {
  const query = format(
    "SELECT * FROM Products WHERE category_id = %L",
    categoryId
  );
  const result = await pool.query(query);
  return result.rows;
};

export {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategoryId,
};
