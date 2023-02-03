describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.getByData('hero-heading').contains('Sheddington Membership Manager');
  });
});
