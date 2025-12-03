import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismaConfig from "@/libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaConfig),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prismaConfig.user.findUnique({
          where: { 
            email: credentials.email 
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", // Enable debug in development mode
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // `user` is only present on first sign-in
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      // copy token properties to session.user so getServerSession has them
      if (session.user) {
        session.user.email = token.email as string | undefined;
      }
      return session;
    },
  },
}

export default NextAuth(authOptions);
