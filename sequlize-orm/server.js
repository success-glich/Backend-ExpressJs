import express from "express";
import "dotenv/config";
import exp from "constants";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/get-health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

app.listen(8000, async () => {
  console.log(`Server is running on port ${port}`);
  try {
  } catch (err) {}
});
