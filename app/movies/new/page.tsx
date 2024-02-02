"use client";

import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { useSearchParams } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";

export default function NewMovies() {
  const searchParams = useSearchParams();
  const visibility = searchParams.get("visibility") || 0;
  const { data: movies, isFetching } = useMovies(
    null,
    "all",
    visibility as number
  );

  return (
    <PageContainer>
      <main className="py-10 px-4">
        <section>
          <div className="flex items-center gap-6 mb-6">
            <div className="h-[50px] flex items center gap-3">
              <div className="h-[100] w-1 bg-blue-900"></div>
              <h1 className="text-[30px] font-bold text-black dark:text-slate-300 mb-3 capitalize">
                Nouveautés
              </h1>
            </div>
          </div>
          <MovieList movies={movies} />
        </section>
      </main>
    </PageContainer>
  );
}
