import request from "supertest";
import app from "../server";
import { deleteUser } from "../services/users/userService";

describe("User Router", () => {
  let createdUserId;
  let accessToken;

  describe("POST /users/register", () => {
    it("should create a new user and return a token", async () => {
      const res = await request(app).post("/users/register").send({
        firstName: "test",
        lastName: "example",
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("accessToken");
    });
  });

  describe("POST /users/login", () => {
    it("should login the user and return a token", async () => {
      const res = await request(app).post("/users/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("accessToken");
      accessToken = res.body.accessToken;
      createdUserId = res.body.user_id;
    });
  });

  describe("GET /users/all", () => {
    it("should not return all the users for a non-admin role", async () => {
      const loginRes = await request(app).post("/users/login").send({
        email: "test@example.com",
        password: "password123",
      });

      const accessToken = loginRes.body.accessToken;

      const res = await request(app)
        .get("/users/all")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.statusCode).not.toEqual(200);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete the user if requested by the same user", async () => {
      console.log("Created User ID:", createdUserId);
      console.log("Access Token:", accessToken);

      const res = await request(app)
        .delete(`/users/${createdUserId}`)
        .set("Authorization", `Bearer ${accessToken}`);

      console.log("Response Status Code:", res.statusCode);
      console.log("Response Body:", res.body);

      expect(res.statusCode).toEqual(200);
    });
  });
});
