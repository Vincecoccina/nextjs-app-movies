import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/connect";
import { sendResetPasswordEmail } from "@/utils/SendEmail";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Tout les champs ne sont pas remplis" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Cet email n'existe pas" },
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passWordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const passwwordExpires = Date.now() + 3600000;

    // existingUser.resetToken = passWordResetToken;
    // existingUser.resetTokenExpires = passwwordExpires;

    const updateUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        resetToken: passWordResetToken,
        resetTokenExpires: new Date(passwwordExpires),
      },
    });
    
    const resetUrl = `${process.env.URL}/reset-password/${resetToken}`;
    const name = existingUser.name ?? "Cher utilisateur";
    const mail = await sendResetPasswordEmail({ email, resetUrl, name });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
