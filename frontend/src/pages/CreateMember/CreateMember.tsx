import React, { useState } from 'react';
import './CreateMember.css';

const CreateMember: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');
  const [renewalDate, setRenewalDate] = useState<string>('');
  const [displayMessage, setDisplayMessage] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const member = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      telephone: telephone,
      gender: gender,
      address: address,
      joinDate: joinDate,
      renewalDate: renewalDate,
    };

    let response = await fetch('http://localhost:8080/members', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    if (response.status === 200) {
      console.log(response);
      setDisplayMessage('Member Created');
    } else {
      const data = await response.json();
      setDisplayMessage(data.message);
    }
  };

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setFirstName(target.value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setLastName(target.value);
  };

  const handleEmailChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handleTelephoneChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setTelephone(target.value);
  };

  const handleAddressChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setAddress(target.value);
  };

  const handleGenderChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setGender(target.value);
  };

  const handleJoinDateChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setJoinDate(target.value);
  };
  const handleRenewalDateChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setRenewalDate(target.value);
  };

  return (
    <div className="createMemberPage">
      <div>
        <form
          className="form"
          id="createMemberInput"
          onSubmit={handleSubmit}
          data-test="memberForm"
        >
          <div className="formBody">
            <label>
              First Name
              <input
                id="firstName"
                className="form__input"
                type="input"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First Name"
                data-test="firstNameInput"
              />
            </label>

            <label>
              Last Name
              <input
                id="lastName"
                className="form__input"
                type="input"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                data-test="lastNameInput"
              />
            </label>

            <label>
              Email
              <input
                id="email"
                className="form__input"
                type="input"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                data-test="emailInput"
              />
            </label>

            <label>
              Telephone
              <input
                id="telephone"
                className="form__input"
                type="input"
                value={telephone}
                onChange={handleTelephoneChange}
                placeholder="Telephone"
                data-test="telephoneInput"
              />
            </label>

            <label>
              Address
              <input
                id="address"
                className="form__input"
                value={address}
                onChange={handleAddressChange}
                type="input"
                placeholder="Address"
                data-test="addressInput"
              />
            </label>

            <label>
              Gender
              <input
                id="gender"
                className="form__input"
                value={gender}
                onChange={handleGenderChange}
                type="input"
                placeholder="Gender"
                data-test="genderInput"
              />
            </label>

            <label>
              Join Date
              <input
                id="joinDate"
                className="form__input"
                value={joinDate}
                onChange={handleJoinDateChange}
                type="input"
                placeholder="Join date"
                data-test="joinDateInput"
              />
            </label>

            <label>
              Renewal Date
              <input
                id="renewalDate"
                className="form__input"
                value={renewalDate}
                onChange={handleRenewalDateChange}
                type="input"
                placeholder="Renewal date"
                data-test="renewalDateInput"
              />
            </label>
          </div>
          <div className="displayMessage" data-test="displayMessage">
            {displayMessage}
          </div>
          <div className="buttonDiv">
            <button
              className="submitButton"
              type="submit"
              data-test="submitButton"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
