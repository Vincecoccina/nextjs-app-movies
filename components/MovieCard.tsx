import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Eye, MessageCircle } from "lucide-react";
import {MovieWithCategory } from "@/type";


type Props = {
  movie: MovieWithCategory;
};

export default function PostCard({ movie }: Props) {
  return (
    <Link href={`/movies/${movie.slug}`}>
      <Card className="flex flex-col justify-between rounded-lg border h-[100%] bg-gray-300 dark:bg-black">
        <CardHeader>
          <div className="rounded-lg aspect-square relative overflow-hidden">
            <Image
              src={movie.coverImg || "/img/bg.jpg"}
              fill
              alt={movie.title}
              className="rounded-lg aspect-square object-cover transition-all duration-700 hover:scale-110"
            />
          </div>
          <p className="font-semibold capitalize">{movie.title}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge>{movie.cat.title}</Badge>
          <Badge
            className={` ${
              movie.warning === "Interdit aux moins de 16 ans"
                ? "bg-red-600"
                : movie.warning === "Interdit aux moins de 12 ans"
                ? "bg-orange-600"
                : "bg-green-600"
            } text-white text-[8px] xl:text-[12px]`}
          >
            {movie.warning}
          </Badge>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <MessageCircle size={20} className="text-slate-600 dark:text-slate-300" />
              <p className="text-slate-600 dark:text-slate-300">{movie.nbComments}</p>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={20} className="text-slate-600 dark:text-slate-300" />
              <p className="text-slate-600 dark:text-slate-300">{movie.nbViews}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
