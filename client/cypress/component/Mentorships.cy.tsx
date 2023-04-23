import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import { mount } from "cypress/react18";
import Mentorships from "../../src/components/Mentorships/Mentorships";
import styles from "../../src/components/Mentorships/Mentorships.module.css";

describe("Mentorships", function () {
  const queryClient = new QueryClient();
  beforeEach(function () {
    cy.viewport(800, 500);
    cy.fixture("../fixtures/mentorships.json").then((mentor) => {
      this.mentor = mentor;
      mount(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <Mentorships data={mentor} header="Mentorship requests" isLoading={false} />
          </QueryClientProvider>
        </MemoryRouter>,
      );
    });
  });
  it("Should render component", () => {
    cy.get('[data-testid="mentorships"]').should("exist");
  });
  it("Should contains data from response", function () {
    cy.get('[data-cy="email"]').should("have.text", "Email: " + this.mentor[0].user.email);
    cy.get('[data-cy="message"]').should("have.text", "Message: " + this.mentor[0].message);
    cy.get('[data-cy="status"]').should("have.text", this.mentor[0].status);
  });
  it("Should have class in order what mentorship status is", () => {
    cy.get("[data-cy='status']").should("have.class", styles.statusAccepted);
  });
  it("Should show modal on button click", () => {
    cy.get("[data-cy='showModal']").click();
    cy.get('[data-testid="mentorshipModal"]').should("exist");
  });
  it("Should hide modal on click backdrop", () => {
    cy.get("[data-cy='showModal']").click();
    cy.get('[data-testid="overlay"]').click({ force: true });
    cy.get('[data-testid="mentorshipModal"]').should("not.exist");
  });
});
