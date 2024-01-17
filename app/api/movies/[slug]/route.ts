import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  try {
    const movie = await prisma.movie.update({
      where: { slug },
      data: { nbViews: { increment: 1 } },
    });
    return NextResponse.json(movie, {status: 200})
  } catch (error) {
    return NextResponse.json({error: "Somerhing went wrong"}, {status: 500})
  }
};
