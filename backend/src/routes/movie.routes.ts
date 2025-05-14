import express from "express";

import {
  getPopularMovies,
  searchMovieByQuery,
  getMovieById,
  getMovieRecommendations
} from "../controllers/movie.controller";

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/search", searchMovieByQuery);
router.get("/:id", getMovieById);
router.get("/:id/recommendations", getMovieRecommendations);

export default router;
