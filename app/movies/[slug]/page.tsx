import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Eye, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.URL}/api/movies/${slug}`, {
    cache: "no-store",
  });

  return res.json();
};

const SingleMoviePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const movie = await getData(slug);

  return (
    <PageContainer>
      <main className="py-10 px-4">
        {/* HERO SECTION */}
        <section
          style={{
            backgroundImage: `url(${movie.heroImg})`,
          }}
          className="rounded-lg aspect-square md:aspect-[3/1] overflow-hidden bg-cover bg-center"
        >
          <div className="w-[90%] xl:w-[40%] h-[100%] px-[20px] py-0 flex flex-col justify-center gap-3 bg-gradient-to-r from-black to-transparent">
            <span className="text-[20px] sm:text-[30px] font-semibold uppercase text-white">
              {movie.catSlug}
            </span>
            <h1 className="text-[30px] sm:text-[50px] font-semibold text-white capitalize">
              {movie.title}
            </h1>
            <Badge
              className={`w-[70%] md:w-[40%] ${
                movie.warning === "Interdit aux moins de 16 ans"
                  ? "bg-red-600"
                  : movie.warning === "Interdit aux moins de 12 ans"
                  ? "bg-orange-600"
                  : "bg-green-600"
              } text-white`}
            >
              {movie.warning}
            </Badge>
            <div className="mt-[50px]">
              <Button className="flex items-center gap-3 cursor-pointer">
                <Download />
                Télécharger
              </Button>
            </div>
          </div>
        </section>

        {/* INFOS SECTION */}
        <section>
          <div className="flex justify-between items-start p-3 mb-3">
            <div className="flex flex-col justify-center gap-1">
              <h3 className="text-[30px] font-semibold text-black dark:text-slate-300">
                Infos
              </h3>
              <div className="text-[#333] dark:text-slate-400 font-semibold">
                <p>Année : {movie.year}</p>
                <p>Pays : {movie.country}</p>
                <p>De : {movie.director}</p>
                <p>Avec : {movie.casting}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <MessageCircle size={20} />
                <p>{movie.nbComments}</p>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={20} />
                <p>{movie.nbViews}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="mt-3">
          <div className="flex flex-col items-center lg:items-start lg:flex-row">
            <div className="flex-1 text-center lg:text-start">
              <h3 className="text-[30px] font-semibold text-black dark:text-slate-300 mb-3">
                Synopsis
              </h3>
              <p className="text-[17px] text-[#333] dark:text-slate-400 w-[90%] mx-auto lg:mx-0">
                {movie.synopsis}
              </p>
            </div>
            <div className="mt-5">
              <h3 className="text-[30px] font-semibold text-black dark:text-slate-300 mb-3 text-center lg:text-start">
                Trailer
              </h3>
              <div className="aspect-square md:w-[560px] md:h-[315px]">
                <iframe
                  className="w-full h-full"
                  src={movie.trailer}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageContainer>
  );
};

export default SingleMoviePage;
