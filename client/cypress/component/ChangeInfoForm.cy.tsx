import React from "react";
import { mount } from "cypress/react18";
import ChangeInfoForm from "../../src/components/ChangeInfoForm/ChangeInfoForm";
import styles from "../../src/components/ChangeInfoForm/ChangeInfoForm.module.css";

describe("ChangeInfoForm", () => {
  beforeEach(() =>
    mount(
      <ChangeInfoForm header="Header" onSubmit={cy.stub()}>
        Children
      </ChangeInfoForm>,
    ),
  );
  it("Should not contains any text in fields", () => {
    cy.get('input[type="text"]').should("have.value", "");
    cy.get("textarea").should("have.value", "");
  });
  it("Should not display error message before click submit", () => {
    cy.get('[data-cy="error"]').should("not.exist");
  });
  it("Should display error on submit", () => {
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy="error"]').should("not.be.hidden");
  });
  it("Should not display error on valid inputs", () => {
    cy.get('[data-cy-input="firstname"]').type("John");
    cy.get('[data-cy-input="lastname"]').type("Adams");
    cy.get('[data-cy-input="title"]').type("Software developer");
    cy.get('[data-cy-input="about"]').type("Hi, I'm John");
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy="error"]').should("not.exist");
  });
  it("Should display error on any invalid inputs", () => {
    cy.get('[data-cy-input="firstname"]').type("John");
    cy.get('[data-cy-input="lastname"]').type("Adams");
    cy.get('[data-cy-input="title"]').type("Software developer");
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy="error"]').should("exist");
  });
  it("Should display error on any invalid inputs", () => {
    cy.get('[data-cy-input="firstname"]').type("John");
    cy.get('[data-cy-input="lastname"]').type("Adams");
    cy.get('[data-cy-input="title"]').type("Software developer");
    cy.get('input[type="submit"]').click();
    cy.get('[data-cy-input="about"]').should("have.class", styles.inputError);
  });
});
