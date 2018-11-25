import { Request, Response, Router } from "express";
import User from "../controllers/user.controller";
import Ticket from "../controllers/ticket.controller";

export class TrainRouter {
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
    this.router.route("/check-in")
      .post(async (req, res) => {
        let zone = "Helsinki";
        let charge = 'cpi_1';
        await User.controller.updateUser({customerId: req.body.user}, {station: null});
        Ticket.controller.createTicket(req.body.user, {
          type: 'Single Ticket',
          valid: '15:00',
          group: 'Adult',
          zone,
          price: 220,
          charge
        });
      }); // Create ticket
    this.router.route("/check-out")
      .post((req, res) => {
        Ticket.controller.deleteTicket(req.body.user);
      }); // Expire ticket
    this.router.route("/arrived-at/:id")
      .get(async (req, res) => {
        let users = await User.controller.getUsersInStation(req.params.id);
        res.send(users);
      }); // Find users with stop :id
    this.router.route("/new-zone")
      .get(async (req, res) => {
        await Ticket.controller.changeZone();
      });
  }
}
