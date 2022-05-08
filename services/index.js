const Config = require("../config/config"),
  { Pool } = require("pg");

const connectionString =
  process.env.CONNECTION_STRING || Config.connectionString;

const userService = {};

const credentials = {
  user: process.env.DB_USER || "postgres",
  host: process.env.HOST || "localhost",
  database: "chowdary",
  password: process.env.PASSWORD || "root",
  port: process.env.PG_PORT || 5432,
};

const connection = async () => {
  try {
    const client = new Pool(credentials);
    if (client) {
      let conn = await client.connect();
      return conn;
    }
  } catch (err) {
    console.log("Error While Connection --> PgSQL :", err, err.message);
    throw new Error(err);
  }
};

userService.getUsers = async (skip, limit) => {
  try {
    const conn = await connection();
    const offset = skip || 1;
    limit = limit || 100;
    skip = limit * (offset - 1);
    let where = "",
      order_by = " ORDER BY id";

    const users = await conn.query(
      `SELECT * FROM "Users" ${where} ${order_by} LIMIT ${limit} OFFSET ${skip};`
    );
    return users.rows;
  } catch (err) {
    console.log("Error on UserController -->getUsers:", err.message, err);
    throw new Error({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

userService.nearByUsers = async (radius) => {
  try {
    const conn = await connection();
    const users = await conn.query(
      `SELECT * FROM "Users" WHERE location <@ circle '((-34.603722, -58.381592), ${radius})';`
    );
    return users.rows;
  } catch (err) {
    console.log("Error on UserController -->nearByUsers:", err.message, err);
    throw new Error({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

userService.usersCount = async (lat, lng) => {
  try {
    const conn = await connection();
    const count = await conn.query(`SELECT count(*) as count FROM "Users";`);
    return count.rows[0];
  } catch (err) {
    console.log("Error on UserController -->nearByUsers:", err.message, err);
    throw new Error({
      status: false,
      message: err.message,
      error: err,
    });
  }
};

module.exports = userService;
