const Config = require("./config"),
  { Pool } = require("pg");

const connectionString =
  process.env.CONNECTION_STRING || Config.connectionString;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
