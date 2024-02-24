import pool from "../pg.js";
import format from "pg-format";
import bcrypt from "bcrypt";

const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = format(
      "INSERT INTO Users (first_name, last_name, email, password, role) VALUES (%L, %L, %L, %L, %L) RETURNING user_id, first_name, last_name, email, role;",
      firstName,
      lastName,
      email,
      hashedPassword,
      "user"
    );

    const result = await pool.query(query);
    return result.rows[0]; // This will return the inserted user's details
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const query = format("SELECT * FROM Users WHERE email = %L", email);
  const result = await pool.query(query);
  return result.rows[0];
};

const findUserById = async (userId) => {
  const query = format("SELECT * FROM Users WHERE user_id = %L", userId);
  const result = await pool.query(query);
  return result.rows[0];
};

const allUsers = async () => {
  const query = format(
    "SELECT user_id, first_name, last_name, email FROM Users"
  );
  const result = await pool.query(query);
  return result.rows;
};

const deleteUser = async (userId) => {
  const query = format("DELETE FROM Users WHERE user_id = %L", userId);
  await pool.query(query);
};

const updateUser = async (userId, { firstName, lastName, email }) => {
  const query = format(
    "UPDATE Users SET first_name = %L, last_name = %L, email = %L WHERE user_id = %L",
    firstName,
    lastName,
    email,
    userId
  );
  await pool.query(query);
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  allUsers,
  deleteUser,
  updateUser,
};
