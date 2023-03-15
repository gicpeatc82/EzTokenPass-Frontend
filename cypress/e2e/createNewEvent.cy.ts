describe('create new event by owner', () => {
  beforeEach(() => {
    // 測試前執行
    cy.isLogin();
    cy.visit('/member/my_manage_events');
  });

  it('user click create new event btn', () => {
    // click to open the create event dialog box
    cy.get('#create-new-event-btn').click();

    // check if the create event dialog from is open
    cy.findByRole('heading', { name: /create a new event/i });

    // progress 0
    // select the how often host an event
    cy.findByRole('button', { name: /select how often host an event/i }).click();
    cy.findByRole('option', { name: /daily/i }).click().and('have.value', 0);

    // select Did you deploy any smart contract on chain
    cy.findByText(/yes/i).click();

    // select How do you know token pass
    cy.findByRole('button', { name: /how do you know token pass/i }).click();
    cy.findByRole('option', { name: /saw it on social media/i }).click();

    // click to the next progress
    cy.findByRole('button', { name: /next/i });

    // progress 1
  });
});
