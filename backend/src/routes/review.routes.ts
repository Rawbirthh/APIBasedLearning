import express from 'express';
import { addReview, getMovieReviews } from '../controllers/review.controller';

const router = express.Router();

router.post('/', addReview);
router.get('/:movieId', getMovieReviews);

export default router;