import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import './Home.css';

interface MemberProps {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string | undefined;
  joinDate: string;
  renewalDate: string;
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = (): JSX.Element => {
  const [members, setMembers] = useState<MemberProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = () => {
    try {
      fetch('http://localhost:8080/members', {
        method: 'get',
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          setMembers(data);
        });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const formatDate = (dateTime: string) => {
    const date = dateTime.substring(0, 10);
    const formattedDate = `${date.substring(8, 10)}/${date.substring(
      5,
      7,
    )}/${date.substring(0, 4)}`;

    return formattedDate;
  };

  return (
    <div className="Home">
      <h1 data-test="hero-heading" className="heading">
        Sheddington Membership Manager
      </h1>
      <div className="errorMessage" data-test="errorMessage">
        {' '}
        {errorMessage}{' '}
      </div>
      <div className="members" data-test="members">
        {members.map((member: MemberProps) => (
          <div
            className="member"
            key={member.id}
            data-test={`member${member.id}`}
          >
            <p>First Name: {member.firstName}</p>
            <p>Last Name: {member.lastName}</p>
            <p>Email: {member.email}</p>
            <p>Telephone: {member.telephone}</p>
            <p>Address: {member.address}</p>
            <p>Gender: {member.gender}</p>
            <p>Join Date: {formatDate(member.joinDate)}</p>
            <p>Renewal Date: {formatDate(member.renewalDate)}</p>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
