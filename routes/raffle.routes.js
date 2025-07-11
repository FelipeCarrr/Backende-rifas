import express from "express";
import {
  createRaffle,
  getAllRaffles,
  getRaffleById,
  drawRaffleManual
} from "../controllers/raffle.controller.js";

import { buyTickets } from "../controllers/ticket.controller.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllRaffles);
router.get("/:id", getRaffleById);
router.post("/:id/buy", authenticate, buyTickets);

// Admin routes
router.post("/", authenticate, isAdmin, createRaffle);

// 🔘 Sorteo manual con botón (opcional)
router.post("/:id/draw", authenticate, isAdmin, drawRaffleManual);

export default router;
