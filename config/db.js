import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
  DB_DIALECT = "mysql",
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: false,
});
