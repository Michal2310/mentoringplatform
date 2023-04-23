import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import { mount } from "cypress/react18";
import Mentor from "../../src/components/Mentor/Mentor";

describe("Mentor", () => {
  const queryClient = new QueryClient();
  beforeEach(function () {
    cy.viewport(800, 500);
    cy.fixture("../fixtures/mentor.json").then((mentor) => {
      this.mentor = mentor;
      mount(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <Mentor data={mentor} />
          </QueryClientProvider>
        </MemoryRouter>,
      );
    });
  });
  it("Should render component", () => {
    cy.get("[data-testid='mentor']").should("exist");
  });
  it("Should contains data from response", function () {
    const mentor = this.mentor[0].user;
    cy.get('[data-cy="country"]'.toLowerCase()).should("have.text", mentor.country[0].country);
    cy.get("[data-cy='firstname']").should("have.text", mentor.firstname);
    cy.get("[data-cy='about']").should("have.text", "Bio: " + mentor.about);
  });
  it("Should display border star on component render", () => {
    cy.get('[data-testid="starButton"]')
      .find("svg")
      .should("have.class", "MuiSvgIcon-root")
      .should("have.class", "MuiSvgIcon-fontSizeMedium")
      .should("have.class", "css-i4bv87-MuiSvgIcon-root")
      .find("path")
      .should(
        "have.attr",
        "d",
        "m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
      );
  });
  it("Should change star icon on border star click", () => {
    cy.get('[data-testid="starButton"]')
      .click()
      .find("svg")
      .find("path")
      .should(
        "have.attr",
        "d",
        "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
      );
  });
  it("Should change start icon to border star icon on double click star icon", () => {
    cy.get('[data-testid="starButton"]')
      .dblclick()
      .find("svg")
      .find("path")
      .should(
        "have.attr",
        "d",
        "m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
      );
  });
});
