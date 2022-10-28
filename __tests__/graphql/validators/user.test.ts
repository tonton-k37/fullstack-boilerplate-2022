import { faker } from "@faker-js/faker";
import { createMockContext } from "../../context";
import { Context } from "@graphql/context";
import { protectedAction } from "@graphql/validators";
import { exampleValidateUpdateUser } from "@graphql/validators/user";

const ctx = createMockContext({
  user: { id: faker.datatype.uuid() },
  token: faker.datatype.string(),
}) as Context;

describe("user update validation", () => {
  it("should execute update when passing validation", () => {
    const action = () => "passed";
    const result = protectedAction({
      ctx,
      args: true,
      validations: [exampleValidateUpdateUser],
    })(action);

    expect(result).toBe("passed");
  });

  it("shold not execute update when failing exampleValidationUpdateUser", () => {
    const errorMessage = "validation failed";

    expect(() =>
      protectedAction({
        ctx,
        args: false,
        validations: [exampleValidateUpdateUser],
      })
    ).toThrow(errorMessage);
  });
});
