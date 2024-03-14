import express from "express";
const app = express();
import userRouter from "./routes/users";

const PORT = 3005;

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// * To generate ts config file run command ["yarn","ts-jest","config:init"]
