const request = require('supertest');

const app = require('../../app');

const models = require('../../models');

const EmergencyContacts = models.emergencyContacts;
const Members = models.members;

const { memberData } = require('../testData');

describe('/emergencyContact', () => {
  beforeEach(async () => {
    await Members.create(memberData);
  });

  afterEach(async () => {
    await EmergencyContacts.truncate({ cascade: true, restartIdentity: true });
    await Members.truncate({ cascade: true, restartIdentity: true });
  });

  afterAll(async () => {
    await models.sequelize.close();
  });

  const emergencyContactData = {
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  const expectedEmergencyContactResponse = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    telephone: '1234123412',
    relationship: 'Partner',
    member_id: 1,
  };

  // Create
  describe('/POST emergencyContact, create emergency contact', () => {
    it('should create a emergency contact', async () => {
      const response = await request(app)
        .post('/emergencyContacts')
        .send(emergencyContactData);

      const createdEmergencyContact = response.body;

      expect(response.statusCode).toBe(200);
      expect(createdEmergencyContact).toMatchObject(
        expectedEmergencyContactResponse,
        { ignore: ['createdAt', 'updatedAt'] },
      );
    });

    it('should fail with code 409 when member is not found ', async () => {
      const response = await request(app)
        .post('/emergencyContacts')
        .send({ ...emergencyContactData, member_id: 2 });

      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe('Member with that ID does not exist');
    });

    it('should fail with error when entry is not present', async () => {
      const updatedEmergencyContact = {
        ...emergencyContactData,
        firstName: '',
      };

      const response = await request(app)
        .post('/emergencyContacts')
        .send(updatedEmergencyContact);

      expect(response.statusCode).toBe(409);
      expect(response.body).toMatchObject({
        message: "Emergency contact's firstName cannot be empty string",
      });
    });
  });

  // Update
  describe('/PUT emergencyContact, update emergency contact', () => {
    const newEmergencyContactData = {
      ...emergencyContactData,
      firstName: 'David',
    };

    it('should update an emergency contact', async () => {
      await request(app).post('/emergencyContacts').send(emergencyContactData);

      const id = 1;
      const response = await request(app)
        .put(`/emergencyContacts/${id}`)
        .send(newEmergencyContactData);

      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 and error message when emergency contact not found', async () => {
      const id = 5;

      const response = await request(app)
        .put(`/emergencyContacts/${id}`)
        .send(newEmergencyContactData);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        'Emergency contact with that ID not found',
      );
    });
  });

  // Delete
  describe('/DELETE emergencyContact, delete emergency contact', () => {
    it('should delete an emergency contact', async () => {
      // Create emergency contact with ID of 1
      await request(app).post('/emergencyContacts').send(emergencyContactData);

      const id = 1;

      const response = await request(app).delete(`/emergencyContacts/${id}`);

      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 and error message when emergency contact not found', async () => {
      const id = 1;

      const response = await request(app).delete(`/emergencyContacts/${id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        'Emergency contact with that ID not found',
      );
    });
  });
});
