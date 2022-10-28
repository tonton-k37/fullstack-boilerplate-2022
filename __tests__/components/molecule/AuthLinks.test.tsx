import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthLinks } from "@components/molecules";

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
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("AuthLinks Component", () => {
  it("Show Log Out When no session", async () => {
    const { container } = render(<AuthLinks />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText("sign out")).toBeInTheDocument();
  });
});
