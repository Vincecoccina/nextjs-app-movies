import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],
};

export const getAuthSession = () => getServerSession(authOptions)


