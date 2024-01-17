import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const catSlug = searchParams.get("cat");

    const movies = await prisma.movie.findMany({
        where: {
            ...(catSlug && catSlug != "null" && catSlug != "" && {catSlug})
        },
        include:{
            cat : true
        }
    })
    return NextResponse.json(movies, {status : 200})
  } catch (error) {
    return NextResponse.json({error: "Something went wrong"}, {status : 500})
  }
};
