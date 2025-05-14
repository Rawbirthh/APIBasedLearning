import express from 'express';
import { addToWatchHistory, getPersonalizedRecommendations } from '../controllers/user.controller';

const router = express.Router();

router.post('/:userId/watch-history', addToWatchHistory);
router.get('/:userId/recommendations', getPersonalizedRecommendations);

export default router;