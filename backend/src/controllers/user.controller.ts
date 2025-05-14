import { Request, Response } from 'express';
import User from '../models/User.model';
import { getRecommendations } from '../utils/tmdbService';

export const addToWatchHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { movieId, rating } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return 
    }

    // Add or update watch history
    const existingEntryIndex = user.watchHistory.findIndex(
      entry => entry.movieId === movieId
    );

    if (existingEntryIndex >= 0) {
      user.watchHistory[existingEntryIndex].watchedAt = new Date();
      if (rating) {
        user.watchHistory[existingEntryIndex].rating = rating;
      }
    } else {
      user.watchHistory.push({
        movieId,
        watchedAt: new Date(),
        rating,
      });
    }

    await user.save();
    res.json(user.watchHistory);
  } catch (error) {
    console.error('Error updating watch history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPersonalizedRecommendations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return 
    }

    
    if (user.watchHistory.length === 0) {
     res.json([]);
     return 
    }

    const lastWatchedMovieId = user.watchHistory[user.watchHistory.length - 1].movieId;
    const recommendations = await getRecommendations(lastWatchedMovieId);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};