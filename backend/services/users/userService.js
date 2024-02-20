import pool from "../pg.js";
import format from "pg-format";
import bcrypt from "bcrypt";

const createUser = async ({ firstName, lastName, email, password, role }) => {
  const query = format(
    "INSERT INTO Users (first_name, last_name, email, password, role) VALUES (%L, %L, %L, %L, %L) RETURNING user_id;",
    firstName,
    lastName,
    email,
    await bcrypt.hash(password, 10),
    "user"
  );

  const result = await pool.query(query);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = format("SELECT * FROM Users WHERE email = %L", email);
  const result = await pool.query(query);
  return result.rows[0];
};

export { createUser, findUserByEmail };
