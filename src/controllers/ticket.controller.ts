import TicketModel from "../models/ticket.model";
import { Request, Response } from "express";

class TicketController {
    public async getUserTicket(user) {
        const ticket = await Ticket.model.findOne({user, active: true});
        console.log(ticket);
        return ticket;
    }

    public createTicket(user, ticket) {
        Ticket.model.create({user, ...ticket});
    }

    public deleteTicket(user) {
        Ticket.model.updateOne({user}, {active: false});
    }

    public async changeZone() {
        const ticket = await Ticket.model.find({active: true});

        ticket.forEach((t) => {
            // refund ticket.charge
            const newCharge = "cpi_2";
            Ticket.model.updateOne({_id: t._id}, {zone: "Regional", price: 420, charge: newCharge});
        });
    }
}

const Ticket = {
    model: TicketModel,
    controller: new TicketController(),
};

export default Ticket;
