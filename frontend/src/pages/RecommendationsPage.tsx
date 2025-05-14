import { useState, useEffect } from "react";
import { getPersonalizedRecommendations } from "../api/movieApi";
import type { Movie } from "@/types/movie";
import { MovieCard } from "../components/MovieCard";

export const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = 'user-id-from-auth';
        const recs = await getPersonalizedRecommendations(userId);
        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Recommended For You</h1>
      
      {loading ? (
        <div>Loading recommendations...</div>
      ) : recommendations.length === 0 ? (
        <div>No recommendations available. Watch some movies first!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};