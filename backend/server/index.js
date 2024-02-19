import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./controllers/User.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
