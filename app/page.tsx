
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

const Home = async() => {
  const movies = await getData()
  const categories = await getCategories()

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

        {/* Movie List Section */}
        <MovieList movies={movies}/>
      </main>
    </PageContainer>
  );
}

export default Home;