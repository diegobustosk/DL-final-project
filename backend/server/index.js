import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "../controllers/Users.js";
import productRouter from "../controllers/Products.js";
import orderRouter from "../controllers/Orders.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
