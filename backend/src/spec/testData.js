const memberData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  interests: ['Making and Mending', 'Gardening'],
  medicalConditions: ['Lower body paralysis'],
  specialRequirements: ['Wheelchair access'],
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  emergencyContacts: [
    {
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '1234123412',
      relationship: 'Partner',
    },
  ],
};

const expectedMemberResponse = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  interests: ['Making and Mending', 'Gardening'],
  medicalConditions: ['Lower body paralysis'],
  specialRequirements: ['Wheelchair access'],
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  createdEmergencyContacts: [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '1234123412',
      relationship: 'Partner',
      member_id: 1,
    },
  ],
};

const expectedMemberResponseById = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'js@example.com',
  telephone: '1234567890',
  address: '12 example address',
  gender: 'M',
  interests: ['Making and Mending', 'Gardening'],
  medicalConditions: ['Lower body paralysis'],
  specialRequirements: ['Wheelchair access'],
  joinDate: '2023-12-01T00:00:00.000Z',
  renewalDate: '2024-12-01T00:00:00.000Z',
  emergencyContacts: [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      telephone: '1234123412',
      relationship: 'Partner',
      member_id: 1,
    },
  ],
};

module.exports = {
  expectedMemberResponse,
  memberData,
  expectedMemberResponseById,
};
