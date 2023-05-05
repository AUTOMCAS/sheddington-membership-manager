import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type MemberProps = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  interests: string;
  medicalInformation: string;
  accessibilityRequirements: string;
  joinDate: string;
  renewalDate: string;
  createdAt: string;
  updatedAt: string;
  emergencyContacts: EmergencyContactsProp[];
};

type EmergencyContactsProp = {
  firstName: string;
  lastName: string;
  telephone: string;
  relationship: string;
};

const MemberPage: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<MemberProps | null>(null);

  useEffect(() => {
    if (id) {
      getMember(id);
    }
  }, [id]);

  const getMember = async (id: string) => {
    const memberData = await fetch(`http://localhost:8080/members/${id}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setMember(memberData);
  };

  return (
    <div className="member-page">
      <h2 className="page-heading">Member page</h2>
      {member !== null && (
        <div>
          <div>{member.firstName}</div>
          <div>{member.lastName}</div>
          <div>{member.email}</div>
          <div>{member.telephone}</div>
          <div>{member.address}</div>
          <div>{member.gender}</div>
          <div>{member.medicalInformation}</div>
          <div>{member.accessibilityRequirements}</div>
          <div>{member.interests}</div>
          <div>{member.joinDate}</div>
          <div>{member.renewalDate}</div>
          <div>{member.emergencyContacts[0].firstName}</div>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
