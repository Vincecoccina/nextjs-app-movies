import { Movie } from "@prisma/client";
import MovieCard from "./MovieCard";
import React from "react";
import { MovieWithCategory } from "@/type";

type Props = {
  movies: MovieWithCategory[];
  
};

export default function MovieList({ movies }: Props) {
  return (
    <div className="gap-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies?.map((movie: MovieWithCategory) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
