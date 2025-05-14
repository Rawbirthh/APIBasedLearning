import { Request, Response } from "express";
import { fetchPopularMovies,searchMovies
, getMovieDetails, getRecommendations } from "../utils/tmdbService";




export const getPopularMovies = async (req: Request, res: Response) => {
    try {
        const popularMovies = await fetchPopularMovies();
        res.json(popularMovies);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
};


export const searchMovieByQuery = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        if (!query) {
          res.status(400).json({ message: 'Query parameter is required' });
          return
        }
        const searchResults = await searchMovies(query as string);
        res.json(searchResults);
    } catch (error) {
        console.error("Error searching movies:", error);
        res.status(500).json({ error: "Failed to search movies" });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const movieDetails = await getMovieDetails(id);
        res.json(movieDetails);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
};


export const getMovieRecommendations = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const recommendations = await getRecommendations(parseInt(id));
        res.json(recommendations);
    } catch (error) {
        console.error("Error fetching movie recommendations:", error);
        res.status(500).json({ error: "Failed to fetch movie recommendations" });
    }
};