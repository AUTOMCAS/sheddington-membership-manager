describe('template spec', () => {
  it('should visit CreateMember page', () => {
    cy.visit('http://localhost:3000/member/create');
  });

  xit('Should submit a valid form', () => {
    cy.intercept('POST', '/members', []).as('newMember');

    cy.visit('http://localhost:3000/members/create');
    cy.getByData('firstNameInput').type('Chris');
    cy.getByData('lastNameInput').type('Tester');
    cy.getByData('emailInput').type('chris2@email.com');
    cy.getByData('telephoneInput').type('12342572993');
    cy.getByData('addressInput').type('22 Example Address');
    cy.getByData('customGenderInput').type('Unknown');

    cy.get('#createMemberInput').submit();

    cy.get('@newMember').its('request.body').should('deep.include', {
      firstName: 'Chris',
      lastName: 'Tester',
      email: 'chris2@email.com',
      telephone: '12342572993',
      address: '22 Example Address',
      gender: 'Unknown',
    });
    cy.getByData('displayMessage').should('contain', 'Member Created');
  });
});
