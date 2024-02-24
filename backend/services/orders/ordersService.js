import pool from "../pg.js";
import format from "pg-format";

const getAllOrders = async () => {
  const query = "SELECT * FROM Orders";
  const result = await pool.query(query);
  return result.rows;
};

const getOrderById = async (orderId) => {
  const query = format("SELECT * FROM Orders WHERE order_id = %L", orderId);
  const result = await pool.query(query);
  if (result.rows.length === 0) {
    throw new Error("Order not found");
  }
  return result.rows[0];
};

const createOrder = async (userId, products) => {
  const total_amount = products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  const orderQuery = format(
    "INSERT INTO Orders (user_id, status, tracking_info, total_amount, payment_status) VALUES (%L, %L, %L, %L, %L) RETURNING *;",
    userId,
    "pending",
    "Debería crearse info para hacer Tracking",
    total_amount,
    "Deberia ir el payment Status"
  );

  const orderResult = await pool.query(orderQuery);
  const newOrder = orderResult.rows[0];

  for (const product of products) {
    const orderDetailsQuery = format(
      "INSERT INTO OrderDetails (order_id, product_id, quantity, unit_price) VALUES (%L, %L, %L, %L);",
      newOrder.order_id,
      product.productId,
      product.quantity,
      product.price
    );
    await pool.query(orderDetailsQuery);
  }

  return { newOrder };
};

const deleteOrder = async (orderId) => {
  const deleteQuery = "DELETE FROM Orders WHERE order_id = $1 RETURNING *;";
  const result = await pool.query(deleteQuery, [orderId]);

  return result.rowCount > 0; // Retorna true si se eliminó algún registro, false si no
};
export { getAllOrders, getOrderById, createOrder, deleteOrder };
