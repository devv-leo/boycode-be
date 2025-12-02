const express = require ('express');
const router = express.Router();

/* importing controller functions */

const {
    getMovies,
    getMoviesById,
    createMovie,
    updateMovie,
    partialUpdateMovie,
    deleteMovie 
} = require ('../controllers/movieController.js');

/* Validation middleware */
const {
    validateMovie,
    validateMoviePatch
} = require ('../middleware/validateMovie.js');

/* Movie Routes */

router.get('/', getMovies);
router.get('/:id', getMoviesById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.patch('/:id', partialUpdateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;