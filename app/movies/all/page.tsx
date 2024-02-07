import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";

const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/movies`, {
    cache: "no-store",
  });

  return res.json();
};

const AllMovies = async () => {
  const movies = await getData();

  return (
    <PageContainer>
      <main className="py-10 px-4">
        <section>
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-[22px] font-bold text-black dark:text-gray-100 capitalize italic">
              Le catalogue Uncut vidéo
            </h1>
            <Badge className="text-white text-[14px] font-bold bg-cyan-600">
              {movies.length}
            </Badge>
          </div>
          <MovieList movies={movies} />
        </section>
      </main>
    </PageContainer>
  );
};

export default AllMovies;
