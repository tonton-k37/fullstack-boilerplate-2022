import { faker } from "@faker-js/faker";
import { createMockContext } from "../../context";
import { Context } from "@graphql/context";
import { protectedAction } from "@graphql/validators";

describe("protectedAction", () => {
  it("shold execute action after validation HOC", async () => {
    const ctx = createMockContext({
      user: { id: faker.datatype.uuid() },
      token: faker.datatype.string(),
    }) as Context;

    const action = () => "passed";
    const result = protectedAction({ ctx })(action);

    expect(result).toBe("passed");
  });
});
