import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import type { Session, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt/types";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@lib/prisma";

// check more about providers https://next-auth.js.org/configuration/providers/oauth#built-in-providers
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hoge@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !credentials?.password) return null;

        const rawpass = credentials.password;
        const hash = user.password;
        const isValidPassword = await bcrypt.compare(rawpass, hash);

        if (!isValidPassword) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    // more about callbacks https://next-auth.js.org/configuration/callbacks
    // https://next-auth.js.org/getting-started/typescript

    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User | AdapterUser;
      token: JWT;
    }) {
      const userData = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });

      session.user.name = userData?.uid ?? "hoge";
      session.user.image =
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg";

      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
