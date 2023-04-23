import React from "react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { mount } from "cypress/react18";
import ChangePassword from "../../src/components/ChangePassword/ChangePassword";
import styles from "../../src/components/ChangePassword/ChangePassword.module.css";

describe("ChangePassword", () => {
  const queryClient = new QueryClient();

  beforeEach(() =>
    mount(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ChangePassword />
        </QueryClientProvider>
      </MemoryRouter>,
    ),
  );
  it("Should display rendered component", () => {
    cy.get('[data-testid="changePassword"]').should("exist");
  });
  it("Should display error on any invalid inputs", () => {
    cy.get("[data-cy-input='currentPassword']").type("MyCurrentPassword");
    cy.get("input[type='submit']").click();
    cy.get("[data-cy='error']").should("exist");
    cy.get("[data-cy-input='currentPassword']").should("not.have.class", styles.inputError);
    cy.get("[data-cy-input='newPassword']").should("have.class", styles.inputError);
  });
  it("Should not display error on valid inputs", () => {
    cy.intercept("PATCH", "http://localhost:3001/account/", "success");
    cy.get("[data-cy-input='currentPassword']").type("MyCurrentPassword");
    cy.get("[data-cy-input='newPassword']").type("MyNewPassword");
    cy.get("#form").submit();
  });
});
