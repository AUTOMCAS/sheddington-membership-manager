import React, { useState } from 'react';
import './AddMember.css';

const CreateMember: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');
  const [renewalDate, setRenewalDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      setErrorMessage('Member Added');
    } else {
      const data = await response.json();
      setErrorMessage(data.message);
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
    <div className="AddMemberPage">
      <form id="addMemberInput" onSubmit={handleSubmit} data-test="memberForm">
        <input
          id="firstName"
          type="input"
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="First Name"
          data-test="firstNameInput"
        />
        <br></br>
        <input
          id="lastName"
          type="input"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Last Name"
          data-test="lastNameInput"
        />
        <br></br>
        <input
          id="email"
          type="input"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          data-test="emailInput"
        />
        <br></br>
        <input
          id="telephone"
          type="input"
          value={telephone}
          onChange={handleTelephoneChange}
          placeholder="Telephone"
          data-test="telephoneInput"
        />
        <br></br>
        <input
          id="address"
          value={address}
          onChange={handleAddressChange}
          type="input"
          placeholder="Address"
          data-test="addressInput"
        />
        <br></br>
        <input
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          type="input"
          placeholder="Gender"
          data-test="genderInput"
        />
        <br></br>
        <input
          id="joinDate"
          value={joinDate}
          onChange={handleJoinDateChange}
          type="input"
          placeholder="Join date"
          data-test="joinDateInput"
        />
        <br></br>
        <input
          id="renewalDate"
          value={renewalDate}
          onChange={handleRenewalDateChange}
          type="input"
          placeholder="Renewal date"
          data-test="renewalDateInput"
        />
        <br></br>
        <button className="submitButton" type="submit" data-test="submitButton">
          Add Member
        </button>
        <div className="errorMessage" data-test="errorMessage">
          {' '}
          {errorMessage}{' '}
        </div>
      </form>
    </div>
  );
};

export default CreateMember;
