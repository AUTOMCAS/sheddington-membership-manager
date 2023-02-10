describe('template spec', () => {
  it('should visit CreateMember page', () => {
    cy.visit('http://localhost:3000/member/add');
  });
});

// cy.getByData('errorMessage').contains('Sheddington Membership Manager');
