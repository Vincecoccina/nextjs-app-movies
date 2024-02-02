import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";

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
            <div className="h-[50px] flex items center gap-3">
              <div className="h-[100] w-1 bg-blue-900"></div>
              <h1 className="text-[30px] font-bold text-black dark:text-slate-300 mb-3 capitalize">
                Le catalogue Uncut vidéo
              </h1>
            </div>
            <p className="text-blue-600 text-[14px] font-bold">
              {movies.length}
            </p>
          </div>
          <MovieList movies={movies} />
        </section>
      </main>
    </PageContainer>
  );
};

export default AllMovies;
