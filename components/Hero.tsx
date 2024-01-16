import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{ backgroundImage: "url(/img/bg.jpg" }}
      className="rounded-lg aspect-square md:aspect-[3/1] overflow-hidden bg-cover"
    >
      <div className="w-[40%] h-[100%] px-[20px] py-0 flex flex-col justify-center gap-5 bg-gradient-to-r from-black to-transparent">
        <span className="text-[30px] font-semibold uppercase text-white">
          à la une
        </span>
        <h1 className="text-[50px] font-semibold text-white">
          3 Days Of A Blind Girl 
        </h1>
        <p className="text-[17px] text-slate-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad earum provident quas? Necessitatibus explicabo at quidem debitis autem perferendis repellat eligendi velit, dolores dicta reprehenderit beatae temporibus aliquam nam tempora.
        </p>
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
  );
}
