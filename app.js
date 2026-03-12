const path = require("path");
const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
  cookjie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("Success");
  res.locals.update = req.flash("Update");
  res.locals.deleteMsg = req.flash("Delete");
  res.locals.review = req.flash("Review");
  res.locals.error = req.flash("error");
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/review", reviews);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is started on http://localhost:8080/");
});
