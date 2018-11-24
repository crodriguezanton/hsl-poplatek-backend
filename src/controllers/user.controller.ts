import UserModel from "../models/user.model";
import { Request, Response } from "express";

class UserController {
    
}

const User = {
    model: UserModel,
    controller: new UserController(),
};

export default User;
