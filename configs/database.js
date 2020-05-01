const env = require("../helpers/dotenv");
module.exports = {
  development: {
    username: env("DB_USER"),
    password: env("password"),
    database: env("database"),
    host: env("host"),
    port: env("dbPort"),
    dialect: env("dialect"),
    dialectOptions: {
      bigNumberStrings: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  },
  production: {
    username: env("DB_USER"),
    password: env("password"),
    database: env("database"),
    host: env("host"),
    port: env("dbPort"),
    dialect: env("dialect"),
    dialectOptions: {
      bigNumberStrings: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  },
};
