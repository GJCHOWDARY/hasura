const config = {
    port: 8083,
    username: "postgres",
    password: "root",
    database: "chowdary",
    pg_prot: 5432,
    host: "127.0.0.1",
    dialect: "postgres", 
    jwt: "!@#$%^&*()1234567890a-zAZ",
    bcrypt_key: "1234567890a-zAZ!@#$%^&*()_+~",
    connectionString: 'postgres://postgres:root@localhost:5432/chowdary', 
  };

module.exports = config;