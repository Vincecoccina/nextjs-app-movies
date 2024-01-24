import React from "react";
import { Button } from "./ui/button";
import { Download, Info } from "lucide-react";
import { useFeatured } from "@/hooks/useFeatured";
import { truncateText } from "@/utils/TruncateText";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/movies/featured`, {
    cache: "no-store",
  });

  return res.json();
};

const Hero = async() => {
  const movie = await getData()

  return (
    <section
    style={{
      backgroundImage: `url(${movie.heroImg})`,
    }}
      className="rounded-lg aspect-square md:aspect-[3/1] overflow-hidden bg-cover bg-center"
    >
      <div className="w-[40%] h-[100%] px-[20px] py-0 flex flex-col justify-center gap-5 bg-gradient-to-r from-black to-transparent">
        <span className="text-[30px] font-semibold uppercase text-white">
          à la une
        </span>
        <h1 className="text-[50px] font-semibold text-white capitalize">
          {movie.title}
        </h1>
        <p className="text-[17px] text-slate-300">
          {/* {truncateText(movie.synopsis, 200)} */}
        </p>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-3 cursor-pointer bg-green-700 text-white">
            <Download />
            Télécharger
          </Button>
          <Link href={`/movies/${movie.slug}`}>
            <Button className="flex items-center gap-3 cursor-pointer">
              <Info />
              En savoir plus
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;