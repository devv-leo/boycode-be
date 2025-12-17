const express = require("express");
const app = express();

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(logger);

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

// Required by PDF → return 404 JSON
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use(errorHandler);

module.exports = app;
