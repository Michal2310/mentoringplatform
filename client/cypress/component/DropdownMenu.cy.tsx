import React from "react";
import { mount } from "cypress/react18";
import DropdownMenu from "../../src/components/DropdownMenu/DropdownMenu";
import { Skill } from "../../src/hooks/useAccoutUpdate";

describe("DropdownMenu", () => {
  beforeEach(function () {
    const setState = cy.stub(React, "useState").returns([false, cy.stub()]);
    cy.fixture("../fixtures/skills.json").then((skills) => {
      this.skills = skills;
      mount(
        <DropdownMenu<Skill>
          dataArray={skills}
          itemKey="skill"
          isRadioButton={false}
          state={{}}
          setState={setState}
        />,
      );
    });
  });
  it("Should render compinent", () => {
    cy.get("[data-testid='dropdown']").should("exist");
  });
  it("Should show data on click", () => {
    cy.get("[data-testid='panel']").should("not.exist");
    cy.get("[data-cy='openDropdownButton']").click();
    cy.get("[data-testid='panel']").should("exist");
  });
  it("Should check checkbox on click label", () => {
    cy.get("[data-cy='openDropdownButton']").click();
    cy.get("[data-testid='label']").click({ multiple: true });
    cy.get("input[type='checkbox']").should("be.checked");
  });
});
