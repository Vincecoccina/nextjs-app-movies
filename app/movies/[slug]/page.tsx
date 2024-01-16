import Hero from "@/components/Hero";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Eye, MessageCircle } from "lucide-react";

export default function SingleMoviePage() {
  const MOVIE = {
    id: 2,
    category: "Action",
    title: "A toute épreuve",
    synopsis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad earum provident quas? Necessitatibus explicabo at quidem debitis autem perferendis repellat eligendi velit, dolores dicta reprehenderit beatae temporibus aliquam nam tempora.",
    year: "1992",
    country: "Hong-kong",
    director: "John Woo",
    casting: "Chow Yun Fat, Anthony wong",
    cover: "",
    hero: "",
    file: "",
    nbViews: 10,
    nbComments: 8,
    slug: "a-toute-epreuve",
  };

  return (
    <PageContainer>
      <main className="py-10 px-4">
        {/* HERO SECTION */}
        <section
          style={{ backgroundImage: "url(/img/bg.jpg" }}
          className="rounded-lg aspect-square md:aspect-[3/1] overflow-hidden bg-cover"
        >
          <div className="w-[40%] h-[100%] px-[20px] py-0 flex flex-col justify-center gap-5 bg-gradient-to-r from-black to-transparent">
            <span className="text-[30px] font-semibold uppercase text-white">
              {MOVIE.category}
            </span>
            <h1 className="text-[50px] font-semibold text-white">
              {MOVIE.title}
            </h1>
            <p className="text-[17px] text-slate-300">{MOVIE.synopsis}</p>
            <div>
              <Button className="flex items-center gap-3 cursor-pointer">
                <Download />
                Télécharger
              </Button>
              {/* {!moviePage && (
            <Button inverse href={`/movie/${featured[0].slug}`}>
              <Info sx={{ fontSize: "30px" }} />
              En savoir plus
            </Button>
          )} */}
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
                <p>Année : {MOVIE.year}</p>
                <p>Pays : {MOVIE.country}</p>
                <p>De : {MOVIE.director}</p>
                <p>Avec : {MOVIE.casting}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <MessageCircle size={20} />
                <p>{MOVIE.nbComments}</p>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={20} />
                <p>{MOVIE.nbViews}</p>
              </div>
            </div>
          </div>
        </section>
        <Separator />
        <section className="mt-3">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-[30px] font-semibold text-black dark:text-slate-300">
              Synopsis
            </h3>
            <p className="text-[17px] text-[#333] dark:text-slate-400 w-[60%] text-center mt-3">
              {MOVIE.synopsis}
            </p>
          </div>
        </section>
      </main>
    </PageContainer>
  );
}
