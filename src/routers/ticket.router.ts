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
      .get((req, res) => {
        const ticket = Ticket.controller.getUserTicket(req.params.user);
        res.send(ticket);
      });
  }
}
