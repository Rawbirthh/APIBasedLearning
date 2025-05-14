import { Request, Response } from 'express';
import Review from '../models/Reviews.model';


export const addReview  = async (req: Request, res: Response) => {
    try {
        const { movieId, userId, rating, comment } = req.body;
        const review = new Review({ movieId, userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

export const getMovieReviews = async (req: Request, res: Response) => {
    try {
      const { movieId } = req.params;
      const reviews = await Review.find({ movieId: parseInt(movieId) }).populate('userId', 'username');
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };