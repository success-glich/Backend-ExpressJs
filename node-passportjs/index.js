import express from "express";
import "./auth.js";
import passport from "passport";
import session from "express-session";
import "dotenv/config";
const app = express();

const { SESSION_SECRET } = process.env;
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<a href='auth/google'>Signup with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/error",
  }),
  function (req, res) {
    res.send("working fine");
  }
);

const isAuthenticated = (req, res, next) => {
  console.log("user", req.user);
  req.user ? next() : res.redirect("/");
};
app.get("/dashboard", isAuthenticated, function (req, res) {
  // console.log("user", req.user);
  res.send(`welcome to dashboard: ${req.user.displayName}`);
}); // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//   return cb(err, user);
// });

app.get("/auth/error", (req, res) => {
  res.send("Error occurred");
});

app.listen(8000, () => {
  console.log(`Server is running at port${8000}`);
});
