const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const validateMovie = require("../middleware/validateMovie");
const reviewRoutes = require("./reviewRoutes");

// MOVIE ROUTES
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", validateMovie, movieController.createMovie);
router.put("/:id", validateMovie, movieController.replaceMovie);
router.patch("/:id", validateMovie, movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

// NESTED REVIEW ROUTES
router.use("/:movieId/reviews", reviewRoutes);

module.exports = router;
