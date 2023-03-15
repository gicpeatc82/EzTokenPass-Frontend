/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * shorthand command for `data-test="<dataTestAttribute>"`
     * @example cy.getBySel('my-element')
     */
    getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;
    isLogin(): void;
  }
}
