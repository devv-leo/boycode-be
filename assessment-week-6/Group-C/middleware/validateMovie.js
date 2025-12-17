module.exports = (req, res, next) => {
  const { title, genre, year, rating } = req.body;
  const errors = [];

  if (!title || typeof title !== "string")
    errors.push("title is required and must be a string");

  if (!genre || typeof genre !== "string")
    errors.push("genre is required and must be a string");

  if (year === undefined || isNaN(Number(year)))
    errors.push("year is required and must be a number");

  if (rating !== undefined) {
    const r = Number(rating);
    if (isNaN(r) || r < 0 || r > 5)
      errors.push("rating must be between 0 and 5");
  }

  if (errors.length) return res.status(422).json({ message: "Validation failed", errors });

  next();
};
