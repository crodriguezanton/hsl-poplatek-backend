import { Request, Response, Router } from "express";
import User from "../controllers/user.controller";

export class UserRouter {
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
    this.router.route("/")
      .post((req, res) => res.sendStatus(200));
    this.router.route("/station")
      .get((req, res) => res.sendStatus(200))
      .post((req, res) => res.sendStatus(200));
  }
}
