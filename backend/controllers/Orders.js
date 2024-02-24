import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../services/orders/orderService.js"; // Asegúrate de que estas funciones estén definidas en tu servicio de pedidos
import { authenticateToken } from "./middlewares/authenticate.js";
import { authRole } from "./middlewares/authorization.js";

const ordersRouter = express.Router();

// GET /orders - Obtener todos los pedidos (solo admin)
ordersRouter.get(
  "/",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    try {
      const orders = await getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// GET /orders/:id - Obtener detalles de un pedido específico (usuario o admin)
ordersRouter.get("/:id", authenticateToken, async (req, res) => {
  if (req.user.user_id !== userId && req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  const orderId = req.params.id;

  try {
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send("Order not found");
    }
    if (req.user.user_id !== order.user_id && req.user.role !== "admin") {
      return res.status(403).send("Access Denied");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// POST /orders - Crear un nuevo pedido
ordersRouter.post("/", authenticateToken, async (req, res) => {
  if (req.user.user_id !== userId && req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  try {
    const newOrder = await createOrder(req.user.user_id, req.body.products);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

ordersRouter.delete("/:id", authenticateToken, async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await getOrderById(orderId);

    if (req.user.user_id === order.user_id || req.user.role === "admin") {
      await deleteOrder(orderId);
      res.status(200).send("Order deleted successfully");
    } else {
      res.status(403).send("Access Denied");
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default ordersRouter;
