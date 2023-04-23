import React from "react";
import { mount } from "cypress/react18";
import UserMentorships from "../../src/components/UserMentorships/UserMentorships";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";

describe("UserMentorships", () => {
  const queryClient = new QueryClient();

  beforeEach(function () {
    cy.fixture("../fixtures/userMentorships.json").then((mentorships) => {
      this.mentorships = mentorships;
      console.log(mentorships);
      mount(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <UserMentorships
              data={mentorships}
              header={"Mentorship requests"}
              showMoreParam="receivedRequests"
              showButtons
            />
          </QueryClientProvider>
        </MemoryRouter>,
      );
    });
  });
  it("Should render component", () => {
    cy.get('[data-testid="mentorships"]').should("exist");
  });
  it("Should display data from response", function () {
    cy.get('[data-cy="email"]').should(
      "have.text",
      "Email: " + this.mentorships.data[0].user.email,
    );
    cy.get('[data-cy="message"]').should(
      "have.text",
      "Message: " + this.mentorships.data[0].message,
    );
  });
  it("Should display modal on button click", function () {
    cy.get('[data-cy="modalButton"]').click();
    cy.get('[data-testid="mentorshipModal"]').should("exist");
    cy.get('[data-cy="modalMessage"]').should(
      "have.text",
      "Message: " + this.mentorships.data[0].message,
    );
    cy.get('[data-cy="modalExpectations"]').should(
      "have.text",
      "Expectations: " + this.mentorships.data[0].expectations,
    );
    cy.get('[data-cy="modalBackground"]').should(
      "have.text",
      "Background: " + this.mentorships.data[0].background,
    );
  });
  it("Should hide out modal on backdrop click", () => {
    cy.get('[data-cy="modalButton"]').click();
    cy.get('[data-testid="overlay"]').click({ force: true });
    cy.get('[data-testid="mentorshipModal"]').should("not.exist");
  });
});
