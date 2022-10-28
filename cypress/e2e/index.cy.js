describe("Index page", () => {
  beforeEach(() => {
    cy.log(`Visiting Index Page`);
    cy.clearCookies();
    cy.visit("/");
  });

  it("should render index", () => {
    cy.get("h1").should("have.text", "Hello World!");
  });

  it("can visit sign up page", () => {
    cy.contains("sign up").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signup");
    });
  });

  it("can visit sign in page", () => {
    cy.contains("sign in").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signin");
    });
  });

  it("can not visit need-signed-in page if no session", () => {
    cy.contains("session checked in").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("can not visit protected-by-middleware page if no session", () => {
    cy.contains("middleware protected").click();

    cy.location().should((loc) => {
      expect(loc.toString()).to.eq(
        "http://localhost:3000/api/auth/signin?callbackUrl=%2Fprotected-by-middleware"
      );
    });
  });
});
