import CreateMember from '../../src/components/CreateMember/CreateMember';

describe('CreateMember.cy.tsx', () => {
  it('renders', () => {
    cy.mount(<CreateMember />);
  });
});
