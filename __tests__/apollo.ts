import { ApolloServer } from "apollo-server-micro";
import type { User } from "next-auth";
import { createMockContext } from "./context";
import { schema } from "@graphql/schema";

type CreateServerProp = {
  user: User;
  token: string;
};

/**
 * mocked server of Apollo Server
 * @param args - pass next-auth token and session to mock as authenticated
 * @returns apollo server instance
 */
const createServer = (args?: CreateServerProp) => {
  const mockCtx = args ? createMockContext(args) : createMockContext();

  const server = new ApolloServer({
    schema,
    context: mockCtx,
  });

  return { server, mockCtx };
};

export { createServer };
