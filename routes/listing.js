const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateObjectId,
} = require("../utils/middleware.js");

const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(index)) // Index Route
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(createListing),
  ); //Create Route

//New Route
router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(validateObjectId, wrapAsync(showListing)) //Show Route
  .put(
    isLoggedIn,
    validateObjectId,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(updateListing),
  ) //Update Route
  .delete(isLoggedIn, validateObjectId, isOwner, wrapAsync(deleteListing)); //Delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  validateObjectId,
  isOwner,
  wrapAsync(renderEditForm),
);

module.exports = router;
