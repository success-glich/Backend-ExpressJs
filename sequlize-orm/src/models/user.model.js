import { DataTypes } from "sequelize";
import connection from "./index.js";

const userModel = connection.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("location", value.toLowerCase());
      },
      get() {
        return this.getDataValue("location") + "hello";
      },
    },
  },
  {
    timestamps: true,
  }
);
export default userModel;
