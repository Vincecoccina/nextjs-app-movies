import { NextResponse } from "next/server";
import prisma from "@/lib/connect";


export const GET = async (
    req: Request,
    { params }: { params: { slug: string } }
  ) => {
    const { slug } = params;
  
    try {
      const movie = await prisma.movie.findUnique({
        where: { slug },
        include:{
          cat : true
      }
      });

      if(!movie){
        return NextResponse.json({error: "Movie doen't find"}, {status: 500})
      }

      let similarMovies = await prisma.movie.findMany({
        where: {
          AND: [
            { country: movie.country },
            { NOT: { slug: movie.slug } },
            // { catSlug: movie.catSlug },
          ],
        },
        take: 4,
        include:{
          cat : true
      }
      });

      return NextResponse.json(similarMovies, {status: 200})
    } catch (error) {
      return NextResponse.json({error: "Somerhing went wrong"}, {status: 500})
    }
  };