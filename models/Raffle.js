import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Raffle = sequelize.define("Raffle", {
  name: { type: DataTypes.STRING },
  prizeDescription: { type: DataTypes.STRING },
  ticketPrice: { type: DataTypes.FLOAT },
  totalTickets: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING, defaultValue: "active" },
  winningTicket: { type: DataTypes.INTEGER, allowNull: true },
});
