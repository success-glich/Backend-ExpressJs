import express, { NextFunction, Request, Response } from "express";

const app = express();

const PORT = 3005;

app.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
