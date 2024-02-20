import jwt from "jsonwebtoken";
import { findUserById } from "../../services/users/userService.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.userId);

    if (!user) return res.sendStatus(404);
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

const verifyCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("No credentials");
  }
  next();
};

const verifyNewUserCredentials = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Must have all credentials to create a user");
  }
  next();
};

export { authenticateToken, verifyCredentials, verifyNewUserCredentials };
