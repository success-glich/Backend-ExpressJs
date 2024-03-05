import express from "express";
import "dotenv/config";
import connection from "./src/models/index.js";
import userRouter from "./src/routes/user.routes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/get-health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});
app.use("/api/v1/users", userRouter);

app.listen(8000, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await connection.authenticate();
    // connection.sync({ force: true });
    connection.sync();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
