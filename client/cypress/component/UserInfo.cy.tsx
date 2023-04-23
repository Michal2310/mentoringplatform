import React from "react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { mount } from "cypress/react18";
import UserInfo from "../../src/components/UserInfo/UserInfo";

describe("UserInfo", () => {
  const queryClient = new QueryClient();
  beforeEach(function () {
    cy.fixture("../fixtures/user.json").then((user) => {
      this.user = user;
      mount(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <UserInfo userInit={user} />
          </QueryClientProvider>
        </MemoryRouter>,
      );
    });
  });
  it("Should render component", () => {
    cy.get('[data-testid="userInfo"]').should("exist");
  });
  it("Should contains data from response", function () {
    cy.get('[data-cy="header"]').should("have.text", "Profile information");
    cy.get('[data-cy="email"]').should("have.text", this.user.email);
    cy.get('[data-cy="skills"]').should(
      "have.text",
      this.user.skills.map((el) => el.skill).join(", "),
    );
    cy.get('[data-cy="languages"]').should(
      "have.text",
      this.user.languages.map((el) => el.language).join(", "),
    );
    cy.get('[data-cy="about"]').should("have.text", this.user.about);
  });
});
