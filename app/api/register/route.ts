import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = body.data;
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tout les champs ne sont pas remplis" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    if(existingUser){
        return NextResponse.json({error: "Cet email existe déjà"}, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password : hashedPassword
        }
    })

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
