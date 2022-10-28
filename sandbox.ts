import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { createUser } from "./graphql/actions/user";
import { prisma } from "./lib/prisma";

const create = async () => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const provider = "Credentials";
  const user = {
    email,
    password,
    provider,
  };
  const ctx = {
    prisma: prisma,
  };

  const result = await createUser(user, ctx);
  return result;
};

const res = create();
