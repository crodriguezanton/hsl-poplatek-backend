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
      .post((req, res) => {
        User.controller.createUser(req, res);
      });
    this.router.route("/station/:id")
      .get(async (req, res) => {
        try {
          const user: any = await  User.model.findOne({customerId: req.params.id});
          res.send({station: user!.station});
        } catch (error) {
          res.status(500).send(error);
        }
      })
      .post((req, res) => {
        try {
          User.controller.updateUser(req.params.user, {station: req.body.station});
        } catch (error) {
          res.status(500).send(error);
        }
      });
  }
}
