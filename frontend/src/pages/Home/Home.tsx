import React, { useState, useEffect } from 'react';

import './Home.css';

const Home: React.FC = () => {
  const [members, setMembers] = useState<any>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch('http://localhost:8080/members', {
      method: 'get',
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data[0]);
        setMembers(data);
      });
  };

  return (
    <div className="Home">
      <h1 data-test="hero-heading" className="heading">
        Sheddington Membership Manager
      </h1>
      <div className="members" data-test="members">
        {members.map((member: any) => (
          <p>{member.first_name}</p>
        ))}
      </div>
    </div>
  );
};
export default Home;
