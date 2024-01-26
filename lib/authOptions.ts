import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null

        const passordMatch = await bcrypt.compare(credentials.password, user.password as string)

        if(!passordMatch) return null

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt" as const
  }
};

export const getAuthSession = () => getServerSession(authOptions);
