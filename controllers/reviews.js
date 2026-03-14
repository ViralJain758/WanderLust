const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const newReview = new Review(req.body.review);
  if (req.user) {
    newReview.author = req.user._id;
  }

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("Review", "Review Added!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("Review", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
