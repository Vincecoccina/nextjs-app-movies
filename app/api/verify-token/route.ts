import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/connect";

export const POST = async (req: Request) => {
  try {
    const { token } = await req.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findMany({
      where: {
        resetToken: hashedToken,
        resetTokenExpires: {
            gt: new Date(Date.now()),
          },
      },
      take: 1,
    });
    const existingUser = user[0];

    if(!existingUser){
        return NextResponse.json(
            { error: "Token invalide ou token expiré" },
            { status: 400 }
          );
    }


    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
