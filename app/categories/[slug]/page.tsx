"use client"
import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { useMovies } from "@/hooks/useMovies";
import formatSlug from "@/utils/FormatSlug";

type Props = {
  params: {
    slug: string;
  };
};

const categoryPage = ({ params }: Props) => {
  const { slug } = params;
  const {data: movies, isFetching} = useMovies(slug)

  return (
    <PageContainer>
      <main className="py-10 px-4">
        <h1 className="text-[30px] font-semibold text-black dark:text-slate-300 text-center capitalize">
          {formatSlug(slug)}
        </h1>
        {!isFetching && <MovieList movies={movies} />}
      </main>
    </PageContainer>
  );
};

export default categoryPage;
