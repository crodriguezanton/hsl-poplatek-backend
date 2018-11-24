import { Request, Response, Router } from "express";

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
      .get((req, res) => res.sendStatus(200));
  }
}
