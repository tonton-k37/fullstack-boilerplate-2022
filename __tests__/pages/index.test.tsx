import type { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FindUserDocument } from "@codegen";
import Index from "@pages/index";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mock: MockedResponse = {
  request: {
    query: FindUserDocument,
    variables: {
      id: "",
    },
  },
  result: { data: { userById: undefined } },
};

describe("Index page", () => {
  it("should render the page", async () => {
    const wrapper = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Index />
      </MockedProvider>
    );

    await waitFor(() => [
      expect(wrapper.getByText("Hello World!")).toBeInTheDocument(),
    ]);
  });
});
