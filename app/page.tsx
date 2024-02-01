import Hero from "@/components/Hero";
import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@prisma/client";

const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/movies`, {
    cache: "no-store",
  });

  return res.json();
};

const getCategories = async () => {
  const res = await fetch(`${process.env.URL}/api/categories`, {
    cache: "no-store",
  });

  return res.json();
};

const Home = async () => {
  const movies = await getData();
  const categories = await getCategories();

  return (
    <PageContainer>
      <main className="py-10 px-4">
        {/* Hero Section */}
        <Hero />
        {/* Categories Section */}
        <section className="flex flex-col md:flex-row justify-center items-center gap-4 my-5">
          {categories?.map((category: Category) => (
            <Button variant="outline" key={category.id}>
              <Link href={`categories/${category.slug}`}>{category.title}</Link>
            </Button>
          ))}
        </section>

        <section className="mt-[50px]">
          <h2 className="text-center text-[35px] font-semibold uppercase">
            Des centaines de films à télécharger
          </h2>
        </section>

        {/* Movie List Section */}
        <section className="mt-[50px]">
          <div className="flex items-center justify-between">
            <div className="h-[50px] flex items center gap-3">
              <div className="h-[100] w-1 bg-blue-900"></div>
              <h3 className="text-[30px] font-bold text-black dark:text-slate-300 mb-3 capitalize">
                Les derniers films ajoutés
              </h3>
            </div>
            <div>
              <Link
                href="/movies/all?limit=all"
                className="text-blue-600 text-[14px] font-bold"
              >
                Tout voir
              </Link>
            </div>
          </div>
          <MovieList movies={movies} />
        </section>
      </main>
    </PageContainer>
  );
};

export default Home;
