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
        <section className="mt-[50px] text-center ">
          <h2 className="text-[35px] font-semibold">
            Des centaines de films à télécharger en torrent
          </h2>
          <p className="w-[50%] mx-auto text-[13px] text-gray-400 italic">Bienvenue sur uncutvidéo.fr, ici vous pourrez télécharger plein de films en bonne qualité.</p>
        </section>
        {/* Categories Section */}
        <section className="flex flex-col mt-7">
          <h2 className="text-center text-[25px] font-semibold">Catégories <span className="text-cyan-600">Uncut Vidéo</span></h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-5">
            {categories?.map((category: Category) => (
              <Button
                variant="outline"
                className="border-black dark:border-white rounded-[20px] px-5"
                key={category.id}
              >
                <Link href={`categories/${category.slug}`}>
                  {category.title}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* Movie List Section */}
        <section className="mt-[50px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[22px] font-bold text-black dark:text-gray-100 capitalize italic">
              Les derniers films ajoutés
            </h3>

            <div>
              <Link
                href="/movies/all?limit=all"
                className="text-blue-900 dark:text-cyan-600 text-[14px] font-bold"
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
