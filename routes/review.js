// Handles creating and deleting reviews

const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateReview, isAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")

// Add new review
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

// Delete review
router.delete(
    "/:reviewId",
    isLoggedIn,
    isAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;