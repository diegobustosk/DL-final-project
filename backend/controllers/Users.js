import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../services/users/userService.js";
import {
  authenticateToken,
  verifyCredentials,
  verifyNewUserCredentials,
} from "./middlewares/authenticate.js";
const userRouter = express.Router();

userRouter.get("/", verifyCredentials, authenticateToken, async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  res.json(user);
});

userRouter.post("/register", verifyNewUserCredentials, async (req, res) => {
  try {
    const user = await createUser(req.body);
    const accessToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

userRouter.post("/login", async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    return res.status(400).send("Cant find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { userId: user.user_id },
        process.env.JWT_SECRET
      );
      res.json({ accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

export default userRouter;
