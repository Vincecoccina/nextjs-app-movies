import { NextResponse } from "next/server";
import prisma from "@/lib/connect";
import { getAuthSession } from "@/lib/authOptions";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const catSlug = searchParams.get("cat");
    const limitParam = searchParams.get("limit");
    const visibilityParam = searchParams.get("visibility");
    const pageParam = searchParams.get("page");

    const limit: number = 20;

    let page: number = 1;
    if (pageParam) {
      page = parseInt(pageParam, 10);
    }

    let visibilityCondition: any;
    if (visibilityParam) {
      const visibility = parseInt(visibilityParam, 10);
      visibilityCondition = { visibility };
    } else {
      visibilityCondition = {
        OR: [{ visibility: 0 }, { visibility: 1 }]
      };
    }

    const count = await prisma.movie.count({
      where: {
        ...(catSlug && catSlug !== "null" && catSlug !== "" && { catSlug }),
        ...visibilityCondition,
      },
    });

    // Calculer le nombre d'éléments à sauter pour la pagination
    const skip = (page - 1) * limit;

    const movies = await prisma.movie.findMany({
      where: {
        ...(catSlug && catSlug !== "null" && catSlug !== "" && { catSlug }),
        ...visibilityCondition,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip, 
      take: limit,
      include: {
        cat: true,
      },
    });

    return NextResponse.json({movies, count: count}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};


export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not Allowed" }, { status: 403 });
    }
    const body = await req.json();
    const movie = await prisma.movie.create({
      data: { ...body },
    });
    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
