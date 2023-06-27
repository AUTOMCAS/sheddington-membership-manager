import React, { useState, useEffect } from 'react';
import MemberTable from '../../components/MemberTable/MemberTable';
import memberService from '../../services/member.service';

import './MemberDirectory.css';

type MemberProps = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  joinDate: string;
  renewalDate: string;
  createdAt: string;
  updatedAt: string;
};

const MemberDirectory: React.FC = (): JSX.Element => {
  const [members, setMembers] = useState<Array<MemberProps>>([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const data = await memberService.getAll();
    setMembers(data.reverse());
  };

  return (
    <div className="home">
      <h2 className="page-heading">Manage Members</h2>
      <div className="interaction-bar" data-test="interaction-bar">
        <a href="/members/create">
          {' '}
          <button>Add Member</button>
        </a>
      </div>
      <div className="table">
        <MemberTable data={members} />
      </div>
    </div>
  );
};

export default MemberDirectory;
