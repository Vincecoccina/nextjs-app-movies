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
              <h1 className="text-[22px] font-bold text-black dark:text-gray-100 mb-3 capitalise italic">
                Prochainement
              </h1>
            </div>
          </div>
          {!isFetching && movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <p className="text-center text-[30px]">Aucun films</p>
          )}
        </section>
      </main>
    </PageContainer>
  );
}
