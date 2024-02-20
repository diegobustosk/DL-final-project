import request from "supertest";

import app from "../server";

describe("User Router", () => {
  describe("POST /users/register", () => {
    it("should create a new user and return a token", async () => {
      const res = await request(app).post("/users/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("accessToken");
    });
  });

  describe("POST /users/login", () => {
    it("should login the user and return a token", async () => {
      const res = await request(app).post("/users/login").send({
        email: "johndoe@example.com",
        password: "password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("accessToken");
    });

    // Agrega más casos de prueba aquí...
  });
});
