const movies = require("../data/movies");
const { generateId, paginate } = require("../utils/generateId");

// GET ALL MOVIES (with filtering, sorting, pagination)
exports.getMovies = (req, res) => {
  let result = [...movies];

  if (req.query.genre) result = result.filter(m => m.genre === req.query.genre);
  if (req.query.year) result = result.filter(m => m.year == req.query.year);

  if (req.query["rating[gte]"]) {
    result = result.filter(m => m.rating >= Number(req.query["rating[gte]"]));
  }

  if (req.query.sort) {
    const field = req.query.sort.startsWith("-")
      ? req.query.sort.slice(1)
      : req.query.sort;

    const desc = req.query.sort.startsWith("-");
    result.sort((a, b) => (desc ? b[field] - a[field] : a[field] - b[field]));
  }

  const pageData = paginate(result, req.query.limit, req.query.page);
  res.json({ total: result.length, ...pageData });
};

// GET ONE MOVIE
exports.getMovie = (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
};

// CREATE MOVIE
exports.createMovie = (req, res) => {
  const newMovie = { id: generateId(movies), ...req.body };
  movies.push(newMovie);
  res.status(201).json(newMovie);
};

// REPLACE MOVIE (PUT)
exports.replaceMovie = (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  Object.assign(movie, req.body);
  res.json(movie);
};

// UPDATE MOVIE (PATCH)
exports.updateMovie = (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  Object.assign(movie, req.body);
  res.json(movie);
};

// DELETE MOVIE
exports.deleteMovie = (req, res) => {
  const index = movies.findIndex(m => m.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Movie not found" });

  const removed = movies.splice(index, 1)[0];
  res.json({ message: "Movie deleted", removed });
};
