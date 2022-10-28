import type { PrismaClient } from "@prisma/client";
import type { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import { unstable_getServerSession } from "next-auth/next";
import type { GetServerSidePropsContext } from "next/types";
import { prisma } from "lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";

export type Context = {
  prisma: PrismaClient;
  token?: JWT;
  user?: User;
};

export async function createContext({
  req,
  res,
}: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const token = await getToken({ req });

  if (!session || !token) return { prisma };

  const { user } = session;

  return {
    user,
    token,
    prisma,
  };
}
