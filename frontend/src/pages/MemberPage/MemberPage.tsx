import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import './MemberPage.css';

type MemberProps = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  interests: string[];
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

  const formatDate = (dateTime: string) => {
    const formattedDateOnly = moment(dateTime).format('DD/MM/YYYY');

    return formattedDateOnly;
  };

  return (
    <div className="member-page">
      <h2 className="page-heading">Member page</h2>

      {member !== null && (
        <div>
          <div className="full-name-heading">{`${member.firstName} ${member.lastName}`}</div>
          <div className="personal-information-wrapper">
            <div className="form-sub-header">Personal Information</div>
            <label>First Name:</label>
            <div className="content">{member.firstName}</div>
            <label>Last Name:</label>
            <div className="content">{member.lastName}</div>
            <label>Email:</label>
            <div className="content">{member.email}</div>
            <label>Telephone:</label>
            <div className="content">{member.telephone}</div>
            <label>Address:</label>
            <div className="content">{member.address}</div>
            <label>Gender:</label>
            <div className="content">{member.gender}</div>
            <hr />
          </div>

          <div className="additional-requirements-wrapper">
            <div className="form-sub-header">Additional Requirements</div>
            <div className="grid-content">
              <label>Medical Information:</label>
              <div>{member.medicalInformation}</div>
              <label>Accessibility Requirements:</label>
              <div>{member.accessibilityRequirements}</div>
            </div>
            <hr />
          </div>

          <div className="interests-wrapper">
            <div className="form-sub-header">Interests</div>
            <div className="grid-content">
              <div>
                {member.interests.map((interest, index) => {
                  return <div key={index}>{interest}</div>;
                })}
              </div>
            </div>
            <hr />
          </div>

          <div className="membership-wrapper">
            <div className="form-sub-header">Membership information</div>
            <div className="grid-content">
              <label>Join Date:</label>
              <div>{formatDate(member.joinDate)}</div>
              <label>Renewal Date:</label>
              <div>{formatDate(member.renewalDate)}</div>
            </div>
            <hr />
          </div>

          <div className="emergency-contacts-wrapper">
            <div className="form-sub-header">Emergency Contact information</div>
            <div>
              {member.emergencyContacts.map((eContact, index) => {
                return (
                  <div key={index}>
                    <div className="grid-content">
                      <label>First Name:</label>
                      <div>{eContact.firstName}</div>
                      <label>Last Name:</label>
                      <div>{eContact.lastName}</div>
                      <label>Telephone:</label>
                      <div>{eContact.telephone}</div>
                      <label>Relationship to member:</label>
                      <div>{eContact.relationship}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
