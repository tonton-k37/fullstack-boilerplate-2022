import identity from "lodash/identity";
import pickBy from "lodash/pickBy";
import { objectType, extendType, nonNull, stringArg, idArg } from "nexus";
import type { UpdateUserType } from "../actions/user";
import { User as UserFunction, protectedAction } from "../validators";
import { exampleValidateUpdateUser } from "../validators/user";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.string("uid");
    t.string("email");
    t.string("password");
    t.string("provider");
    t.boolean("isDeleted");
    t.datetime("createdAt");
    t.datetime("updatedAt");
  },
});

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        provider: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        return await UserFunction.createUser(args, ctx);
      },
    });
  },
});

export const FindUser = extendType({
  type: "Query",
  definition(t) {
    t.field("userById", {
      type: "User",
      args: {
        id: nonNull(idArg()),
      },
      resolve(_root, args, ctx) {
        return UserFunction.findUserById(args, ctx);
      },
    });
  },
});

export const UpdateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: "User",
      args: {
        password: stringArg(),
        uid: stringArg(),
      },
      resolve(_root, args, ctx) {
        const noFalsyArgs = pickBy(args, identity) as UpdateUserType;
        // TODO: remember to remove this. this is an example validation
        const validations = [exampleValidateUpdateUser];
        const actionArgs = {
          ctx,
          args: noFalsyArgs,
          validations,
        };
        const result = protectedAction(actionArgs)(UserFunction.updateUser);
        return result;
      },
    });
  },
});
