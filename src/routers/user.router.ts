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
      .get((req, res) => {
        const users = User.model.find({});
        console.log(users);
        res.send(users);
      })
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
          User.controller.updateUser(req.params.id, {station: req.body.station});
          res.sendStatus(200);
        } catch (error) {
          res.status(500).send(error);
        }
      });
  }
}
