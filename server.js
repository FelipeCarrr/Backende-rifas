import dotenv from "dotenv";
dotenv.config(); // 👈 DEBE ir antes de cualquier otro import que use process.env

import { app } from "./app.js";
import { sequelize } from "./config/db.js";
import "./models/index.js"; // relaciones

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
  }
};

startServer();
