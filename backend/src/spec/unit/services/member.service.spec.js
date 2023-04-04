const { validateEntries } = require('../../../services/member.service');

describe('validateEntries', () => {
  it('throws an error if a field is an empty string', async () => {
    const data = { firstName: '', lastName: 'Doe' };
    const owner = 'Member';
    await expect(validateEntries(data, owner)).rejects.toThrow(
      "Member's firstName cannot be empty string",
    );
  });

  it('does not throw an error if all fields are not empty strings', async () => {
    const data = { firstName: 'John', lastName: 'Doe' };
    const owner = 'Member';
    await expect(validateEntries(data, owner)).resolves.not.toThrow();
  });

  it('returns if data is null', async () => {
    const data = null;
    const owner = 'Member';
    await expect(validateEntries(data, owner)).resolves.toBeUndefined();
  });
});
