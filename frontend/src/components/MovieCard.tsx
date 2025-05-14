import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{movie.title}</CardTitle>
        <CardDescription>
          {movie.release_date?.substring(0, 4)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative aspect-[2/3] mb-4">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.jpg'}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        {movie.vote_average && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}/10</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/movie/${movie.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};