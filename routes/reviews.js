const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedInForReview,
  isReviewAuthor,
  validateReview,
} = require("../utils/middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");

//Reviews Post Route
router.post("/", isLoggedInForReview, validateReview, wrapAsync(createReview));

//Delete Review
router.delete(
  "/:reviewId",
  isLoggedInForReview,
  isReviewAuthor,
  wrapAsync(deleteReview),
);

module.exports = router;
