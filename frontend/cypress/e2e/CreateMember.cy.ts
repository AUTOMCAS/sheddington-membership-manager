describe('template spec', () => {
  it('should visit CreateMember page', () => {
    cy.visit('http://localhost:3000/member/create');
  });

  it('Should submit a valid form', () => {
    cy.intercept('POST', '/members', []).as('newMember');

    cy.visit('http://localhost:3000/member/create');
    cy.getByData('firstNameInput').type('Chris');
    cy.getByData('lastNameInput').type('Tester');
    cy.getByData('emailInput').type('chris2@email.com');
    cy.getByData('telephoneInput').type('12342572993');
    cy.getByData('addressInput').type('22 Example Address');
    cy.getByData('genderInput').type('Unknown');
    cy.getByData('joinDateInput').type('01/01/23');
    cy.getByData('renewalDateInput').type('01/01/24');

    cy.get('#createMemberInput').submit();

    cy.get('@newMember').its('request.body').should('deep.include', {
      firstName: 'Chris',
      lastName: 'Tester',
      email: 'chris2@email.com',
      telephone: '12342572993',
      address: '22 Example Address',
      gender: 'Unknown',
      joinDate: '01/01/23',
      renewalDate: '01/01/24',
    });
    cy.getByData('displayMessage').should('contain', 'Member Created');
  });
});
