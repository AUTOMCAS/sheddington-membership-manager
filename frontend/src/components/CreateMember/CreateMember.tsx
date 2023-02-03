import React, { useState } from 'react';

const CreateMember: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');
  const [renewalDate, setRenewalDate] = useState<string>('');

  // const handleSubmit = async (event) => {
  // event.preventDefault();

  // if (email === '' || password === '' || usersName === '') return;
  // if (
  //   !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
  //   !password.match(/^[a-zA-Z0-9]{4,25}$/) ||
  //   !usersName.match(/^[a-z ,.'-]*$/i)
  // )
  //   return;
  // if (!usersName.match(/^[a-z ,.'-]*$/i)) return;

  // await fetch('/users', {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },

  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //     usersName: usersName,
  //     profilePic: profilePicURL,
  //   }),
  // }).then((response) => {
  //   if (response.status === 201) {
  //     navigate('/login');
  //   } else {
  //     navigate('/signup');
  //   }
  // });
  //};

  const handleFirstNameChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setFirstName(target.value);
  };

  const handleLastNameChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setLastName(target.value);
  };

  const handleEmailNameChange = (e: React.SyntheticEvent): void => {
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
    <form className="createMemberInput">
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
        placeholder="Email"
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
        id="address"
        type="input"
        placeholder="Address"
        data-test="addressInput"
      />
      <br></br>
      <input
        id="gender"
        type="input"
        placeholder="Gender"
        data-test="genderInput"
      />
      <br></br>
      <input
        id="joinDate"
        type="input"
        placeholder="Join date"
        data-test="joinDateInput"
      />
      <br></br>
      <input
        id="renewalDate"
        type="input"
        placeholder="Renewal date"
        data-test="renewalDateInput"
      />
      <br></br>
      <button className="submitButton" type="submit" data-test="submitButton">
        Create Member
      </button>
    </form>
  );
};

export default CreateMember;
