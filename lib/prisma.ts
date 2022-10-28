import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

declare const global: NodeJS.Global & { prisma?: PrismaClient };

const prisma = global.prisma || new PrismaClient();

export { prisma };

if (process.env.NODE_ENV === "development") global.prisma = prisma;
