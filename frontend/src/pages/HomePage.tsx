import { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "../api/movieApi";
import type { Movie, MovieDetails } from "@/types/movie";
import { MovieCard } from "../components/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let moviesData;
        if (searchQuery) {
          moviesData = await searchMovies(searchQuery);
        } else {
          moviesData = await fetchPopularMovies();
        }
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
      </h1>
      
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : movies.length === 0 ? (
        <div>No movies found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};