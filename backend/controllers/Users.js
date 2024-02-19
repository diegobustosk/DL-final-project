import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", (req, res) => {
  // Logica para obtener usuarios
  res.json({ users: [] });
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Logica para crear un usuario
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  // Buscar en BD
  const user = users.find((user) => user.email === req.body.email);
  if (user === null) {
    return res.status(400).send("Cant find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

export default router;
