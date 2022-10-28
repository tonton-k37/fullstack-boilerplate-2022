import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { createTestClient } from "apollo-server-testing";
import { createServer } from "../apollo";
import { CreateUserDocument, UpdateUserDocument } from "@codegen";

const now = new Date();
const uid = faker.datatype.uuid();

const user: User = {
  id: faker.datatype.uuid(),
  uid,
  email: faker.internet.email(),
  password: faker.internet.password(),
  provider: "Credentials",
  isDeleted: false,
  createdAt: now,
  updatedAt: now,
};

describe("User Document Creation", () => {
  it("should create user", async () => {
    const { server, mockCtx } = createServer();
    const { mutate } = createTestClient(server);

    mockCtx.prisma.user.create.mockResolvedValueOnce(user);
    const { email, password, provider } = user;

    const response = await mutate({
      mutation: CreateUserDocument,
      variables: {
        email,
        password,
        provider,
      },
    });

    expect(response.data.createUser).toEqual(user);
  });

  it("shold update user", async () => {
    const token = faker.datatype.string();

    const { server, mockCtx } = createServer({
      user: { id: user.id },
      token,
    });

    mockCtx.prisma.user.update.mockResolvedValue(user);

    const response = await server.executeOperation({
      query: UpdateUserDocument,
      variables: {
        uid,
      },
    });

    expect(response.data?.updateUser.uid).toBe(uid);
  });
});
