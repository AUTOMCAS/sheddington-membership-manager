import membersFixture from '../fixtures/members.json';

describe('template spec', () => {
  it('should visit Home page', () => {
    cy.visit('http://localhost:3000/');
  });

  it('should call the backend members', () => {
    cy.intercept('GET', '/members', { fixture: 'members.json' }).as(
      'getMembers',
    );
    cy.visit('http://localhost:3000/');
    cy.wait(['@getMembers']);
  });

  it('should show members full data', () => {
    cy.intercept('GET', '/members', { fixture: 'members.json' }).as(
      'getMembers',
    );
    cy.visit('http://localhost:3000/');
    cy.wait(['@getMembers']);

    cy.getByData('member1')
      .should('contain', `${membersFixture[0].firstName}`)
      .and('contain', `${membersFixture[0].lastName}`)
      .and('contain', `${membersFixture[0].email}`)
      .and('contain', `${membersFixture[0].telephone}`)
      .and('contain', `${membersFixture[0].address}`)
      .and('contain', `${membersFixture[0].gender}`)
      .and('contain', '01/01/2023')
      .and('contain', '01/01/2024');
  });
});
