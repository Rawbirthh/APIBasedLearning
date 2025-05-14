import type { Review } from "./review";

export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    vote_average?: number;
    overview?: string;
    release_date?: string;
  }

  export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    reviews: Review[];
  }