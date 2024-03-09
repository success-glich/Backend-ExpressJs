import express from "express";
import "./auth.js";
import passport from "passport";

const app = express();

app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("<a href='auth/google'>Signup with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/auth/google/callback", function (req, res) {
  res.send("working fine");
});

app.listen(8000, () => {
  console.log(`Server is running at port${8000}`);
});
