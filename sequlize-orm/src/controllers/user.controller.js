import connection from "../models/index.js";
import userModel from "../models/user.model.js";

export default class UserController {
  //* add user to Db
  async addUser(req, res) {
    console.log("hello");
    const { username, location } = req.body;
    if (!username || !location)
      return res.status(400).send("Missing username or location");
    try {
      const data = await userModel.create({ username, location });
      console.log(data);
      if (!data) {
        res.status(400).json({
          success: false,
          message: "Error while inserting the data into user tables",
        });
      }
      res.status(200).json({ success: true, data: data.dataValues });
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

    res.status(200).json({ success: true, data });
  }
  async updateUser(req, res) {
    const { id } = req.params;
    const { username, location } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User id not provided" });
    const data = await userModel.update(
      { username, location },
      { where: { id } }
    );
    res.status(200).json({ success: true, data });
  }
}
