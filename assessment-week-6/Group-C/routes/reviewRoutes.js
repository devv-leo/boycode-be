const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");
const validateReview = require("../middleware/validateReview");

// NESTED ROUTES: /api/movies/:movieId/reviews
router.get("/", reviewController.getMovieReviews);
router.post("/", validateReview, reviewController.createReview);

// TOP LEVEL: /api/reviews/:id
router.get("/:id", reviewController.getReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
