describe('template spec', () => {
  it('should visit Home page', () => {
    cy.visit('http://localhost:3000/');
  });

  it('should call the backend members', () => {
    cy.intercept('GET', '/members', { fixture: 'members.json' });
    cy.visit('http://localhost:3000/');
  });
});
