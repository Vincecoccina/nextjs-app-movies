"use client";

import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { useSearchParams } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";
import { Badge } from "@/components/ui/badge";

export default function NewMovies() {
  const searchParams = useSearchParams();
  const visibility = searchParams.get("visibility") || 0;
  const { data, isFetching } = useMovies(
    null,
    "all",
    visibility as number,
    1
  );

  return (
    <PageContainer>
      <main className="py-10 px-4">
        <section>
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-[22px] font-bold text-black dark:text-gray-100 capitalize italic">
              Nouveautés Uncut vidéo
            </h1>
            {!isFetching && (
              <Badge className="text-white text-[14px] font-bold bg-cyan-600">
                {data?.count}
              </Badge>
            )}
          </div>
          {!isFetching && <MovieList movies={data?.movies} />}
        </section>
      </main>
    </PageContainer>
  );
}
