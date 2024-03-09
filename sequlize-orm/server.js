import express from "express";
import "dotenv/config";
import connection from "./src/models/index.js";
import userRouter from "./src/routes/user.routes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/get-health", (req, res) => {
  // var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  // console.log("ip address", req.ip);
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  console.log(ipaddress);
  console.log(language);
  console.log(software);
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});
app.use("/api/v1/users", userRouter);

app.listen(8000, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    // await connection.authenticate();
    // connection.sync({ force: true });
    // connection.sync();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
