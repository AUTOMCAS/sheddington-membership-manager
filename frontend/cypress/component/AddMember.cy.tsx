import AddMember from '../../src/pages/AddMember/AddMember';

describe('CreateMember.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<AddMember />);
  });
  it('Should have input for first name', () => {
    cy.mount(<AddMember />);
    cy.getByData('firstNameInput').type('Chris').should('have.value', 'Chris');
  });
  it('Should have input for last name', () => {
    cy.mount(<AddMember />);
    cy.getByData('lastNameInput').type('Tester').should('have.value', 'Tester');
  });
  it('Should have input for email', () => {
    cy.mount(<AddMember />);
    cy.getByData('emailInput')
      .type('Chris@Email.com')
      .should('have.value', 'Chris@Email.com');
  });
  it('Should have input for telephone', () => {
    cy.mount(<AddMember />);
    cy.getByData('telephoneInput')
      .type('12342572993')
      .should('have.value', '12342572993');
  });
  it('Should have input for address', () => {
    cy.mount(<AddMember />);
    cy.getByData('addressInput')
      .type('22 Example Address')
      .should('have.value', '22 Example Address');
  });
  it('Should have input for gender', () => {
    cy.mount(<AddMember />);
    cy.getByData('genderInput').type('Unknown').should('have.value', 'Unknown');
  });
  it('Should have input for join date', () => {
    cy.mount(<AddMember />);
    cy.getByData('joinDateInput')
      .type('01/01/23')
      .should('have.value', '01/01/23');
  });
  it('Should have input for renewal date', () => {
    cy.mount(<AddMember />);
    cy.getByData('renewalDateInput')
      .type('01/01/24')
      .should('have.value', '01/01/24');
  });
  it('Should have a submit button', () => {
    cy.mount(<AddMember />);
    cy.getByData('submitButton');
  });
  xit('Should submit a form', () => {
    cy.mount(<AddMember />);
    cy.get('#addMemberInput').submit();
  });
});
