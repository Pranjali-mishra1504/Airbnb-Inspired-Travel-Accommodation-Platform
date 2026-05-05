// Handles CRUD operations for listings

const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js")

// Show all listings
router.get("/", wrapAsync(listingController.index));

// Render new listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show single listing
router.get("/:id", wrapAsync(listingController.showListing));

// Render edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Create listing
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListings));

// Update listing
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;