import React, { useState, useEffect } from 'react';
import MemberTable from '../../components/MemberTable';

import './Home.css';

type MemberProps = {
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
};

const Home: React.FC = (): JSX.Element => {
  const [members, setMembers] = useState<Array<MemberProps>>([]);
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
    <div className="home">
      <h2 className="pageHeading">Manage Members</h2>
      <div>
        <a href="/member/create">
          {' '}
          <button>Add Member</button>
        </a>
      </div>

      <div className="errorMessage" data-test="errorMessage">
        {' '}
        {errorMessage}{' '}
      </div>
      <div className="table">
        <MemberTable data={members} />
      </div>
    </div>
  );
};

export default Home;
