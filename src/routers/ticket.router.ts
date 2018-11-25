import { Request, Response, Router } from "express";
import Ticket from "../controllers/ticket.controller";

export class TicketRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.addRoutes();
  }

  /**
   * getRouter
   * @returns returns the account router with all the access points.
   */
  public getRouter() {
    return this.router;
  }

  private addRoutes() {
    this.router.route("/:user")
      .get(async (req, res) => {
        const ticket = await Ticket.controller.getUserTicket(req.params.user);
        if (!ticket) {
          res.sendStatus(201);
          return;
        }
        res.send(ticket);
      });
  }
}
