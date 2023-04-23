import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import { mount } from "cypress/react18";
import MentorshipModal from "../../src/components/MentorshipModal/MentorshipModal";

describe("MentorshipModal", () => {
  const queryClient = new QueryClient();
  beforeEach(function () {
    cy.viewport(800, 500);
    cy.fixture("../fixtures/mentorships.json").then((mentorship) => {
      this.mentorship = mentorship;
      mount(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <MentorshipModal
              isOpen={true}
              item={mentorship[0]}
              showButtons={false}
              queryKey="receivedMentorships"
              toggle={cy.stub()}
            />
          </QueryClientProvider>
        </MemoryRouter>,
      );
    });
  });
  it("Should render component", () => {
    cy.get('[data-testid="mentorshipModal"]').should("exist");
  });
  it("Should contains data from response", function () {
    cy.get('[data-cy="modalEmail"]').should("have.text", "Email: " + this.mentorship[0].user.email);
    cy.get('[data-cy="modalMessage"]').should(
      "have.text",
      "Message: " + this.mentorship[0].message,
    );
    cy.get('[data-cy="modalExpectations"]').should(
      "have.text",
      "Expectations: " + this.mentorship[0].expectations,
    );
    cy.get('[data-cy="modalBackground"]').should(
      "have.text",
      "Background: " + this.mentorship[0].background,
    );
  });
  it("Should buttons be invisible", () => {
    cy.get('[data-testid="buttons"]').should("not.exist");
  });
});
