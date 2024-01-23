"use client";
import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { useMovies } from "@/hooks/useMovies";
import formatSlug from "@/utils/FormatSlug";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

const categoryPage = ({ params }: Props) => {
  const { slug } = params;
  const { data: movies, isFetching } = useMovies(slug);

  return (
    <>
      <title>{`Uncut - Catégorie ${formatSlug(slug)}`}</title>
      <PageContainer>
        <main className="py-10 px-4">
          <div className="h-[50px] flex items center gap-3 mb-5">
            <div className="h-[100] w-1 bg-blue-900"></div>
            <h1 className="text-[30px] font-semibold text-black dark:text-slate-300 capitalize">
              {formatSlug(slug)}
            </h1>
          </div>
          {!isFetching && <MovieList movies={movies} />}
        </main>
      </PageContainer>
    </>
  );
};

export default categoryPage;
