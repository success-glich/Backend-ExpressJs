import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";
import { CreateUserDto } from "./../dtos/CreateUser.dtos";
import { Request, Response } from "express-serve-static-core";

export default class UserController {
  static createUser(
    req: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
    res: Response<User>
  ) {
    const customField = req.customField;
    res.status(201).send({
      id: "1",
      username: "user123",
      email: "XXXXX@gmail.com",
    });
  }
  static getUsers(req: Request, res: Response) {
    res.json({ success: true, data: [] });
  }
  static getUserById(req: Request, res: Response) {
    res.send({});
  }
}
