import UserModel from "../models/user.model";
import { Request, Response } from "express";

class UserController {
    public createUser(req, res) {
        UserModel.create(req.body)
            .then(() => res.sendStatus(201))
            .catch((err) => res.status(500).send(err));
    }

    public async updateUser(user, updates) {
        await UserModel.update({customerId: user}, updates);
    }

    public async getUsersInStation(station) {
        return await UserModel.find({station});
    }
}

const User = {
    model: UserModel,
    controller: new UserController(),
};

export default User;
