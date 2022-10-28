import type { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  user?: User;
  token?: string;
  prisma: DeepMockProxy<PrismaClient>;
};

function createMockContext(): { prisma: MockContext["prisma"] };
function createMockContext(args: { user: User; token: string }): MockContext;
function createMockContext(args?: {
  user: User;
  token: string;
}): { prisma: MockContext["prisma"] } | MockContext {
  if (!args) {
    return {
      prisma: mockDeep<PrismaClient>(),
    };
  }

  return {
    user: args.user,
    token: args.token,
    prisma: mockDeep<PrismaClient>(),
  };
}

createMockContext();

export { createMockContext };
