
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Download, Eye, MessageCircle } from "lucide-react";
import { Movie } from "@/type";
import { Button } from "./ui/button";

type Props = {
  movie: Movie;
};

export default function PostCard({ movie }: Props) {
  return (
    <Link href={`movies/${movie.slug}`}>
      <Card className="flex flex-col justify-between rounded-lg border-2 h-[100%]">
        <CardHeader>
          <div className="rounded-lg aspect-square relative overflow-hidden">
            <Image
              src={movie.cover || "/img/bg.jpg"}
              fill
              alt={movie.title}
              className="rounded-lg aspect-square object-cover transition-all duration-700 hover:scale-110"
            />
          </div>
          <p className="font-semibold">{movie.title}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge variant="outline">{movie.category}</Badge>
          <Badge className="flex items-center gap-2">
            <Download size={20}/>
            Télécharger
            </Badge>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
              <div className="flex items-center gap-1">
                    <MessageCircle size={20} className="text-slate-500"/>
                    <p className="text-slate-500">{movie.nbComments}</p>
              </div>
              <div className="flex items-center gap-1">
                    <Eye size={20} className="text-slate-500"/>
                    <p className="text-slate-500">{movie.nbViews}</p>
              </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}