import bcrypt from "bcrypt";
import { yupSchemaForSignUp } from "../../lib/yup";
import type { Context } from "../context";
import type { ProtectedActionParam } from "../validators";

type CreateUserType = {
  email: string;
  password: string;
  provider: string;
};

type FindUserType = {
  id: string;
};

type UpdateUserType = {
  password?: string;
  uid?: string;
};

async function createUser(user: CreateUserType, ctx: Context) {
  // validation with yup throws an Error on Failed
  // handle error in client instead of doing some on backend
  // all we want is consisted validation
  await yupSchemaForSignUp.validate(user);

  const saltRound = 10;
  const password = await bcrypt.hash(user.password, saltRound);
  const uid = user.email.split("@")[0];
  return await ctx.prisma.user.create({
    data: { ...user, password, uid },
  });
}

async function findUserById(user: FindUserType, ctx: Context) {
  return await ctx.prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
}

async function updateUser(args: ProtectedActionParam<UpdateUserType>) {
  const { ctx, args: data } = args;

  return await ctx.prisma.user.update({
    where: { id: ctx.user?.id },
    data: data!,
  });
}

export { createUser, findUserById, updateUser };
export type { CreateUserType, FindUserType, UpdateUserType };
