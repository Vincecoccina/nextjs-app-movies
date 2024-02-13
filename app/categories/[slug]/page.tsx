import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";
import { useMovies } from "@/hooks/useMovies";
import formatSlug from "@/utils/FormatSlug";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.URL}/api/movies?cat=${slug}`, {
    cache: "no-store",
  });

  return res.json();
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return {
    title: `Uncut - Tout nos films dans la catégorie ${formatSlug(slug)}`,
    description: `Le catalogue complet d'uncut vidéo dans la catégorie ${formatSlug(slug)}`,
  };
}

const categoryPage = async ({ params }: Props) => {
  const { slug } = params;
  const {movies, count} = await getData(slug);

  return (
    <>
      <PageContainer>
        <main className="py-10 px-4">
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-[25px] font-semibold text-black dark:text-slate-300 capitalize italic">
              {formatSlug(slug)}
            </h1>
            <Badge className="text-white text-[14px] font-bold bg-cyan-600">
              {count}
            </Badge>
          </div>
          <MovieList movies={movies} />
        </main>
      </PageContainer>
    </>
  );
};

export default categoryPage;
