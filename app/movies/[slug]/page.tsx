import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Eye, MessageCircle, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Comments from "@/components/Comments";
import MovieSuggest from "@/components/MovieSuggest";
import DownloadButton from "@/components/DownloadButton";
import Image from "next/image";
import { truncateText } from "@/utils/TruncateText";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.URL}/api/movies/${slug}`, {
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
  const movie = await getData(slug);

  return {
    title: `Uncut - téléchargez ${movie.title} (${movie.year})`,
    description: movie.synopsis,
  };
}

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
          <div className="relative w-[90%] xl:w-[40%] h-[100%] px-[20px] py-0 flex flex-col justify-center gap-2 bg-gradient-to-r from-black to-transparent">
            <span className="text-[20px] sm:text-[30px] font-semibold uppercase text-white italic">
              {movie.catSlug}
            </span>
            <h1 className="text-[30px] sm:text-[50px] font-semibold text-white md:whitespace-nowrap capitalize">
              {movie.title}
            </h1>
            <p className="text-[17px] text-slate-300">
              {truncateText(movie?.synopsis, 200)}
            </p>
            <div className="mt-[50px]">
              <DownloadButton link={movie.file} />
            </div>
          </div>
        </section>

        {/* INFOS SECTION */}
        <section>
          <div className="flex justify-between items-start p-3 mb-3">
            <div className="flex flex-col justify-center gap-1 w-[80%] md:w-[50%]">
              <div className="h-[50px] flex items center gap-3 mb-3">
                <h3 className="text-[30px] font-bold text-black dark:text-slate-300 mb-3">
                  Infos
                </h3>
              </div>
              <div className="flex gap-6">
                <div className="h-[240px] w-[170px]">
                  <Image
                    className="rounded-sm h-[100%] w-[100%]"
                    src={movie.coverImg}
                    width={200}
                    height={200}
                    alt={movie.title}
                  />
                </div>
                <div className="flex flex-col gap-3 text-[#333] dark:text-slate-400 font-bold">
                  <p
                    className={`${
                      movie.warning === "Interdit aux moins de 16 ans"
                        ? "text-red-500"
                        : movie.warning === "Interdit aux moins de 12 ans"
                        ? "text-orange-500" 
                        : "text-green-600"
                    }`}
                  >
                    {movie.warning}
                  </p>
                  <p>
                    Année : <span className="text-cyan-500">{movie.year}</span>
                  </p>
                  <Separator />
                  <p>
                    Pays :{" "}
                    <span className="text-cyan-500">{movie.country}</span>
                  </p>
                  <Separator />
                  <p>
                    De : <span className="text-cyan-500">{movie.director}</span>
                  </p>
                  <Separator />
                  <p>
                    Avec :{" "}
                    <span className="text-cyan-500">{movie.casting}</span>
                  </p>
                </div>
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
        <section className="mt-3 mb-5 py-5">
          <div className="flex flex-col items-center lg:items-start lg:flex-row">
            <div className="flex-1 text-start">
              <div className="h-[50px] flex items center gap-3 mb-5">
                <h3 className="text-[30px] font-bold text-black dark:text-slate-300">
                  Synopsis
                </h3>
              </div>
              <p className="text-[13px] md:text-[17px] leading-7 text-[#333] font-light dark:text-slate-400 w-[100%] md:w-[80%] mx-auto lg:mx-0">
                {movie.synopsis}
              </p>
            </div>
            {movie.trailer && (
              <div className="w-[100%] lg:w-[30%]">
                <div className="h-[50px] flex items center gap-3 mb-5">
                  <h3 className="text-[30px] font-bold text-black dark:text-slate-300">
                    Bande Annonce
                  </h3>
                </div>
                <div className="aspect-square md:w-[100%] md:h-[315px]">
                  <iframe
                    className="w-full h-full"
                    src={movie.trailer}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </section>
        {movie.review && <Separator />}
        <section className="py-5">
          <div className="flex flex-col items-center lg:items-start lg:flex-row">
            {movie.review && (
              <div className="flex-1 text-start py-5">
                <div className="h-[50px] flex items center gap-3 mb-5">
                  <h3 className="text-[30px] font-bold text-black dark:text-slate-300">
                    L'avis d'Uncut
                  </h3>
                </div>
                <p className="text-[13px] md:text-[17px] leading-7 text-[#333] font-light dark:text-slate-400 w-[100%] md:w-[80%] mx-auto lg:mx-0">
                  {movie.review}
                </p>
              </div>
            )}

            {movie.review && (
              <div className="mt-5 w-[100%] lg:w-[30%]">
                <div className="h-[50px] flex items center gap-3 mb-5">
                  <h3 className="text-[30px] font-bold text-black dark:text-slate-300">
                    Note
                  </h3>
                </div>
                <div className="flex items-center justify-center aspect-square md:w-[100%] md:h-[315px] rounded-lg">
                  <span className="text-[80px] text-white font-light">{`${movie.rate} / 10`}</span>
                </div>
              </div>
            )}
          </div>
        </section>
        <section>
          <MovieSuggest movieSlug={slug} />
        </section>
        <section>
          <Comments movieSlug={slug} />
        </section>
      </main>
    </PageContainer>
  );
};

export default SingleMoviePage;
