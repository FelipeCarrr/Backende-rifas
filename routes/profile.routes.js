import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { Ticket, Raffle } from "../models/index.js";

const router = express.Router();

router.get("/tickets", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.findAll({
      where: { userId },
      include: {
        model: Raffle,
      },
      order: [["purchaseDate", "DESC"]],
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tickets del usuario." });
  }
});

export default router;
