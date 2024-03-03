import { password, user } from "pg/lib/defaults";
import connection from "../models/index.js";
import userModel from "../models/user.model.js";

export default class UserController {
  //* add user to Db
  async addUser(req, res) {
    const { username, location } = req.body;
    if (!username || !location)
      return res.status(400).send("Missing username or location");
    try {
      const data = await userModel.create({ username, password });
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
  async getUserById(req, res) {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User id not provided" });
    const data = await userModel.findOne({ where: { id } });
    res.status(200).json(data);
  }
}
