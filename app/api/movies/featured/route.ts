
import { NextResponse } from 'next/server';
import prisma from '@/lib/connect';

export const GET = async () => {
    try {
    
        const count = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * count);
        const featured = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });

    
        return NextResponse.json(featured[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
