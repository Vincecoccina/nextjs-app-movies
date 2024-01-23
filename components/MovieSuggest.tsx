"use client";
import React from "react";
import MovieList from "./MovieList";
import { useSuggest } from "@/hooks/useSuggest";
import { ThumbsUp } from "lucide-react";

export default function MovieSuggest({ movieSlug }: { movieSlug: string }) {
  const { data: movies } = useSuggest(movieSlug);

  return (
    <div className="mt-10">
      <h3 className="flex items-center gap-3 text-[20px] font-bold text-black dark:text-slate-500 mb-3">
        <ThumbsUp />
        Vous pourriez aimer ceci
      </h3>
      <MovieList movies={movies} />
    </div>
  );
}
