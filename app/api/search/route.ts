import { NextResponse } from 'next/server';
import prisma from '@/lib/connect';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("search");

    let searchConditions: any = {};

    if (searchTerm) {
        searchConditions = {
          OR: [
            { title: { contains: searchTerm } },
            { country: { contains: searchTerm } },
          ],
        };
      }

      const searchResults = await prisma.movie.findMany({
        where: searchConditions,
        include:{
            cat : true
        }
        // Ajoutez d'autres options comme 'take', 'orderBy', etc.
      });

   
   return NextResponse.json(searchResults, {status : 200})
  } catch (error) {
    console.error(error);
    return new NextResponse("Erreur lors de la recherche", { status: 500 });
  }
};
