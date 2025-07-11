import { User } from "./User.js";
import { Raffle } from "./Raffle.js";
import { Ticket } from "./Ticket.js";

// Relaciones
User.hasMany(Ticket);
Ticket.belongsTo(User);

Raffle.hasMany(Ticket);
Ticket.belongsTo(Raffle);

Raffle.belongsTo(User, { as: "winner" });

export { User, Raffle, Ticket };
