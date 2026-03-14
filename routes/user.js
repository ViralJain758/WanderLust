const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../utils/middleware.js");

const {
  renderSignupForm,
  createUser,
  renderSigninForm,
  signinUser,
  logoutUser,
} = require("../controllers/user.js");

router
  .route("/signup")
  .get(renderSignupForm)
  .post(saveRedirectUrl, wrapAsync(createUser));

router
  .route("/signin")
  .get(renderSigninForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: true,
    }),
    wrapAsync(signinUser),
  );

router.get("/logout", logoutUser);

module.exports = router;
