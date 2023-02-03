import React from 'react';

const CreateMember: React.FC = () => {
  return (
    <form className="createMemberInput">
      <input
        type="input"
        placeholder="First Name"
        id="firstName"
        data-test="firstNameInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Second Name"
        id="secondName"
        data-test="secondNameInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Email"
        id="email"
        data-test="emailInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Telephone"
        id="telephone"
        data-test="telephoneInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Address"
        id="address"
        data-test="addressInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Gender"
        id="gender"
        data-test="genderInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Join date"
        id="joinDate"
        data-test="joinDateInput"
      />
      <br></br>
      <input
        type="input"
        placeholder="Renewal date"
        id="renewalDate"
        data-test="renewalDateInput"
      />
      <br></br>
    </form>
  );
};

export default CreateMember;
