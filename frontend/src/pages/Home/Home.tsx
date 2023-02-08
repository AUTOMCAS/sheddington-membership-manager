import React, { useState, useEffect } from 'react';

import './Home.css';

interface MemberProps {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  address: string;
  gender: string | undefined;
  join_date: string;
  renewal_date: string;
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
          <p>{member.first_name}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
