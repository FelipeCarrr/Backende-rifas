import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Ticket = sequelize.define("Ticket", {
  ticketNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  raffleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
