import type { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing";
import { faker } from "@faker-js/faker";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Session } from "next-auth/core/types";
import * as nextAuthReact from "next-auth/react";
import type { UseSessionOptions } from "next-auth/react";
import { FindUserDocument } from "@codegen";
import Page from "@pages/protected-by-middleware";

jest.mock("next-auth/react");
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

const id = faker.datatype.uuid();
const email = faker.internet.email();
const now = new Date();

const mock: MockedResponse = {
  request: { query: FindUserDocument, variables: { id: id } },
  result: {
    data: {
      userById: {
        __typename: "User",
        id,
        email,
        uid: id,
        password: "hogehoge",
        provider: "Credentials",
        isDeleted: false,
        createdAt: now,
        updatedAt: now,
      },
    },
  },
};

describe("protected-by-middleware page", () => {
  it("should render the page if authenticated", async () => {
    const mockSession: Session = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: {
        id,
        email,
      },
    };

    nextAuthReactMocked.useSession.mockImplementation(
      (_options?: UseSessionOptions<boolean> | undefined) => {
        return { data: mockSession, status: "authenticated" };
      }
    );

    const wrapper = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => [
      expect(wrapper.getByText(email, { exact: false })).toBeInTheDocument(),
    ]);
  });
});
