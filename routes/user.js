const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, (err) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/signup");
        }
        req.flash("Success", "Welcome to WanderLust!");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }),
);

router.get("/signin", (req, res) => {
  res.render("users/signin.ejs");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("Success", "Welcome back to WanderLust!");
    res.redirect("/listings");
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "You are logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;
