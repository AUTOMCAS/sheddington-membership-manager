import CreateMember from '../../src/components/forms/CreateMemberForm/CreateMemberForm';

describe('CreateMember.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<CreateMember />);
  });
  it('Should have input for first name', () => {
    cy.mount(<CreateMember />);
    cy.getByData('firstNameInput').type('Chris').should('have.value', 'Chris');
  });
  it('Should have input for last name', () => {
    cy.mount(<CreateMember />);
    cy.getByData('lastNameInput').type('Tester').should('have.value', 'Tester');
  });
  it('Should have input for email', () => {
    cy.mount(<CreateMember />);
    cy.getByData('emailInput')
      .type('Chris@Email.com')
      .should('have.value', 'Chris@Email.com');
  });
  it('Should have input for telephone', () => {
    cy.mount(<CreateMember />);
    cy.getByData('telephoneInput')
      .type('12342572993')
      .should('have.value', '12342572993');
  });
  it('Should have input for address', () => {
    cy.mount(<CreateMember />);
    cy.getByData('addressInput')
      .type('22 Example Address')
      .should('have.value', '22 Example Address');
  });
  it('Should have input for gender', () => {
    cy.mount(<CreateMember />);
    cy.getByData('customGenderInput').type('Unknown').should('have.value', 'Unknown');
  });
  it('Should have input for join date', () => {
    cy.mount(<CreateMember />);
    cy.get('#joinDate').type('01/01/23').should('have.value', '01/01/23');
  });
  it('Should have input for renewal date', () => {
    cy.mount(<CreateMember />);
    cy.get('#renewalDate').type('01/01/24').should('have.value', '01/01/24');
  });
});
