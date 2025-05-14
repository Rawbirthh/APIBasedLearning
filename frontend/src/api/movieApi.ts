import axios from 'axios';
import type { Movie, MovieDetails } from '@/types/movie';
import type { Review } from '@/types/review';

const API_BASE_URL = 'http://localhost:5000/api/movies';
const API_BASE_URLS = 'http://localhost:5000/api/users';
const API_BASE_URLSS = 'http://localhost:5000/api/reviews';



//FOR MOVIES API
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${API_BASE_URL}/movies/popular`);
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${API_BASE_URL}/movies/search`, {
    params: { query },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
  return response.data;
};

export const getRecommendations = async (id: number): Promise<Movie[]> => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}/recommendations`);
  return response.data;
};




//FOR USERS API
export const addToWatchHistory = async (userId: string, movieId: number, rating?: number) => {
  await axios.post(`${API_BASE_URLS}/users/${userId}/watch-history`, {
    movieId,
    rating,
  });
};

export const getPersonalizedRecommendations = async (userId: string): Promise<Movie[]> => {
  const response = await axios.get(`${API_BASE_URLS}/users/${userId}/recommendations`);
  return response.data;
};




//FOR REVIEWS API
export const addReview = async (movieId: number, userId: string, rating: number, comment: string) => {
  await axios.post(`${API_BASE_URLSS}/reviews`, {
    movieId,
    userId,
    rating,
    comment,
  });
};

export const getMovieReviews = async (movieId: number): Promise<Review[]> => {
  const response = await axios.get(`${API_BASE_URLSS}/reviews/${movieId}`);
  return response.data;
};