import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
  allUsers,
  deleteUser,
} from "../services/users/userService.js";
import {
  authenticateToken,
  verifyCredentials,
  verifyNewUserCredentials,
} from "./middlewares/authenticate.js";
import { authRole } from "./middlewares/authorization.js";

const userRouter = express.Router();

userRouter.get(
  "/all",
  authenticateToken,
  authRole("admin"),
  async (req, res) => {
    const users = await allUsers();
    res.json(users);
  }
);

userRouter.get("/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;
  if (req.user.user_id !== userId && req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }

  try {
    const user = await findUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

userRouter.post("/register", verifyNewUserCredentials, async (req, res) => {
  try {
    const user = await createUser(req.body);
    const accessToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

userRouter.post("/login", verifyCredentials, async (req, res) => {
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
      res.json({ user_id: user.user_id, accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

userRouter.delete("/:id", authenticateToken, async (req, res) => {
  const userIdToDelete = req.params.id;

  if (req.user.user_id !== userIdToDelete && req.user.role !== "admin") {
    return res.status(403).send("Access Denied");
  }

  try {
    await deleteUser(userIdToDelete);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default userRouter;
