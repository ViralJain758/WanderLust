const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../utils/middleware.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  next();
};

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  }),
);

//New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get(
  "/:id",
  validateObjectId,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    const ownerUsername = listing.owner?.username || "Unknown";
    res.render("listings/show.ejs", { listing, ownerUsername });
  }),
);

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("Success", "New Listing Created!");
    res.redirect("/listings");
  }),
);

//Update Route
router.get(
  "/:id/edit",
  isLoggedIn,
  validateObjectId,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

router.put(
  "/:id",
  isLoggedIn,
  validateObjectId,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    req.flash("Update", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  validateObjectId,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id, { ...req.body.listing });
    req.flash("Delete", "Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
