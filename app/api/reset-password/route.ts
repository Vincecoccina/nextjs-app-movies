import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/connect";

export const POST = async (req: Request) => {
  try {
    const { password, email } = await req.json();


    const existingUser = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await prisma.user.update({
        where: {
          id: existingUser?.id,
        },
        data: {
          password: hashedPassword,
          resetToken: undefined,
          resetTokenExpires: undefined,
        },
      });


    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
