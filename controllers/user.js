const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs", { hideNavbar: true });
};

module.exports.createUser = async (req, res) => {
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
      res.redirect(res.locals.redirectUrl || "/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderSigninForm = (req, res) => {
  res.render("users/signin.ejs", { hideNavbar: true });
};

module.exports.signinUser = async (req, res) => {
  req.flash("Success", "Welcome back to WanderLust!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "You are logged out!");
    res.redirect("/listings");
  });
};
