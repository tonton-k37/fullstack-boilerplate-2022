describe("need-signed-in page", () => {
  beforeEach(() => {
    cy.log(`Visiting Index Page`);
    cy.visit("/");
    cy.clearCookies();
  });

  it("can not visit page if no session", () => {
    cy.contains("middleware protected").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("can visit page if authenticated", () => {
    cy.login();
    cy.contains("middleware protected").click();

    cy.fixture("session", (user) => {
      cy.contains(user.email);
    });
  });
});
