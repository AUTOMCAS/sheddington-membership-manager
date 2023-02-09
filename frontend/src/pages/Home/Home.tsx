import React, { useState, useEffect, useMemo } from 'react';
import MemberTable from '../../components/MemberTable';

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

  const columns: any = useMemo(
    () => [
      {
        Header: 'Members',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Telephone',
            accessor: 'telephone',
          },
          {
            Header: 'Address',
            accessor: 'address',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'Join Date',
            accessor: (row: any) => formatDate(row.joinDate),
          },
          {
            Header: 'Renewal Date',
            accessor: (row: any) => formatDate(row.renewalDate),
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="Home">
      <h1 data-test="hero-heading" className="heading">
        Sheddington Membership Manager
      </h1>
      <div className="errorMessage" data-test="errorMessage">
        {' '}
        {errorMessage}{' '}
      </div>
      <MemberTable columns={columns} data={members} />
    </div>
  );
};

export default Home;
