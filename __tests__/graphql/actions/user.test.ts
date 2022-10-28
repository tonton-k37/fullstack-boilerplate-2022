import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { createMockContext } from "../../context";
import type { MockContext, Context } from "../../context";
import { User as UserFunctions } from "@graphql/validators";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("shoud create a user", async () => {
  const user = {
    uid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  } as User;

  mockCtx.prisma.user.create.mockResolvedValue(user);
});

test("should update a users uid ", async () => {
  const user: User = {
    id: faker.datatype.uuid(),
    uid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    provider: "Credentials",
  };

  mockCtx.prisma.user.update.mockResolvedValue(user);

  await expect(
    UserFunctions.updateUser({ ctx, args: { uid: user.uid } })
  ).resolves.toEqual(user);
});
