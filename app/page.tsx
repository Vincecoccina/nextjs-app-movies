import Hero from "@/components/Hero";
import MovieList from "@/components/MovieList";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Category } from "@/type";
import { CATEGORIES } from "@/utils/Categories";
import { MOVIES } from "@/utils/Movies";
import Link from "next/link";

export default function Home() {
  return (
    <PageContainer>
      <main className="py-10 px-4">
        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <section className="flex flex-col md:flex-row justify-center items-center gap-4 my-5">
          {CATEGORIES.map((category: Category) => (
            <Button variant="outline" key={category.id}>
              <Link href={`categories/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </section>

        {/* Movie List Section */}
        <MovieList movies={MOVIES}/>
      </main>
    </PageContainer>
  );
}
