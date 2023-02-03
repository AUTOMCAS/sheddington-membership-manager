import CreateMember from '../../src/components/CreateMember/CreateMember';

describe('CreateMember.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<CreateMember />);
  });
  it('Should have input for first name', () => {
    cy.mount(<CreateMember />);
    cy.getByData('firstNameInput');
    cy.getByData('firstNameInput').type('Chris');
    cy.getByData('firstNameInput').should('have.value', 'Chris');
  });
  it('Should have input for last name', () => {
    cy.mount(<CreateMember />);
    cy.getByData('lastNameInput');
  });
  it('Should have input for email', () => {
    cy.mount(<CreateMember />);
    cy.getByData('emailInput');
  });
  it('Should have input for telephone', () => {
    cy.mount(<CreateMember />);
    cy.getByData('telephoneInput');
  });
  it('Should have input for address', () => {
    cy.mount(<CreateMember />);
    cy.getByData('addressInput');
  });
  it('Should have input for gender', () => {
    cy.mount(<CreateMember />);
    cy.getByData('genderInput');
  });
  it('Should have input for join date', () => {
    cy.mount(<CreateMember />);
    cy.getByData('joinDateInput');
  });
  it('Should have input for renewal date', () => {
    cy.mount(<CreateMember />);
    cy.getByData('renewalDateInput');
  });
  it('Should have a submit button', () => {
    cy.mount(<CreateMember />);
    cy.getByData('submitButton');
  });
  it('Should allow a new member to be created', () => {
    cy.mount(<CreateMember />);
    cy.getByData('firstNameInput').type('Chris');
    //cy.getByData('successMessage').should('exist');
  });
});
