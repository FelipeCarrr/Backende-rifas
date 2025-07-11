import { Raffle } from "../models/Raffle.js";
import { Ticket } from "../models/Ticket.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

export const getAllRaffles = async (req, res) => {
  const raffles = await Raffle.findAll({ where: { status: "active" } });
  res.json(raffles);
};

export const getRaffleById = async (req, res) => {
  const raffle = await Raffle.findByPk(req.params.id, {
    include: {
      model: Ticket,
      attributes: ["ticketNumber"]
    }
  });
  if (!raffle) return res.status(404).json({ error: "Rifa no encontrada" });
  res.json(raffle);
};

export const createRaffle = async (req, res) => {
  const { name, prizeDescription, ticketPrice, totalTickets } = req.body;

  const raffle = await Raffle.create({
    name,
    prizeDescription,
    ticketPrice,
    totalTickets
  });

  res.status(201).json(raffle);
};

export const drawRaffleManual = async (req, res) => {
  // ⭐ OPCIONAL - Si decides hacer el sorteo desde botón frontend
  const raffle = await Raffle.findByPk(req.params.id, {
    include: Ticket
  });

  if (!raffle || raffle.status !== "active")
    return res.status(400).json({ error: "Rifa inválida" });

  const tickets = raffle.Tickets;
  if (tickets.length === 0) return res.status(400).json({ error: "Sin tickets" });

  const winnerTicket = tickets[Math.floor(Math.random() * tickets.length)];

  raffle.winningTicket = winnerTicket.ticketNumber;
  raffle.status = "finished";
  raffle.set("winnerId", winnerTicket.userId);
  await raffle.save();

  res.json({ winnerTicket: winnerTicket.ticketNumber, winnerUserId: winnerTicket.userId });
};
