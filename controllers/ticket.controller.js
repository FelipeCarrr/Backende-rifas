import { Ticket } from "../models/Ticket.js";
import { Raffle } from "../models/Raffle.js";


export const buyTickets = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  const raffleId = req.params.id;
  const { numbers } = req.body; // array de números seleccionados
  const userId = req.user.id;

  const raffle = await Raffle.findByPk(raffleId, {
    include: Ticket
  });

  if (!raffle || raffle.status !== "active") {
    return res.status(400).json({ error: "Rifa no disponible" });
  }

  const existing = raffle.Tickets.map((t) => t.ticketNumber);

  const duplicates = numbers.filter((n) => existing.includes(n));
  if (duplicates.length > 0) {
    return res.status(400).json({ error: `Números ya comprados: ${duplicates.join(", ")}` });
  }

  const created = await Promise.all(
    numbers.map((n) =>
      Ticket.create({
        raffleId: raffle.id,
        userId,
        ticketNumber: n
      })
    )
  );

  // ✅ Verificar si todos los boletos se vendieron y hacer sorteo automático
  const allTicketsSold = await Ticket.count({ where: { raffleId } });
  if (allTicketsSold >= raffle.totalTickets) {
    const tickets = await Ticket.findAll({ where: { raffleId } });
    const winner = tickets[Math.floor(Math.random() * tickets.length)];
    raffle.winningTicket = winner.ticketNumber;
    raffle.status = "finished";
    raffle.set("winnerId", winner.userId);
    await raffle.save();
  }

  res.status(201).json({ success: true, tickets: created });
};
