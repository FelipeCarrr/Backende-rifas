import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import raffleRoutes from "./routes/raffle.routes.js";
import profileRoutes from "./routes/profile.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/raffles", raffleRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a WinRif API");
});
