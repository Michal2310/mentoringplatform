import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import { mount } from "cypress/react18";
import RecoveryPasswordForm from "../../src/components/RecoveryPasswordForm/RecoveryPasswordForm";
import styles from "../../src/components/RecoveryPasswordForm/RecoveryPasswordForm.module.css";

describe("RecoveryPassword", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    cy.viewport(800, 600);
    mount(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <RecoveryPasswordForm code="2627sjd7" />
        </QueryClientProvider>
      </MemoryRouter>,
    );
  });
  it("Should render component", () => {
    cy.get('[data-testid="passwordReset"]').should("exist");
  });
  it("Should display error message on empty inputs and submit form", () => {
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy="error"]').should("exist");
  });
  it("Should on valid inputs and submit form", () => {
    cy.intercept("POST", "/api/auth/recoverypassword?code=2627sjd7", "success");
    cy.get("[data-cy-input='email']").type("email@host.com");
    cy.get("[data-cy-input='password']").type("mySecretPassword");
    cy.get("[data-cy-input='submitPassword']").type("mySecretPassword");
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy="error"]').should("not.exist");
  });
  it("Should be error when passing two different passwords", () => {
    cy.intercept("POST", "/api/auth/recoverypassword?code=2627sjd7", "success");
    cy.get("[data-cy-input='email']").type("email@host.com");
    cy.get("[data-cy-input='password']").type("mySecretPassword2");
    cy.get("[data-cy-input='submitPassword']").type("myMisspelledSecretPassword");
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy-input="submitPassword"]').should("have.class", styles.inputError);
    cy.get('[data-cy="error"]').should("exist");
  });
});
