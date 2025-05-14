
import axios from "axios";


const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;

}

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      query,
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
    },
  });
  return response.data;
};

export const getRecommendations = async (movieId: number): Promise<Movie[]> => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/recommendations`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};