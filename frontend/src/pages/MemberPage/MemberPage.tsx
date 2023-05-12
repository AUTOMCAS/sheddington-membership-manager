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
      {member !== null && (
        <div>
          <div className="full-name-heading">{`${member.firstName} ${member.lastName}`}</div>
          <div className="member-info-wrapper">
            <div className="personal-information-wrapper">
              <div className="form-sub-header">Personal Information</div>
              <hr />
              <label>First Name:</label>
              <div className="info">{member.firstName}</div>
              <label>Last Name:</label>
              <div className="info">{member.lastName}</div>
              <label>Email:</label>
              <div className="info">{member.email}</div>
              <label>Telephone:</label>
              <div className="info">{member.telephone}</div>
              <label>Address:</label>
              <div className="info">{member.address}</div>
              <label>Gender:</label>
              <div className="info">{member.gender}</div>
            </div>

            <div className="membership-wrapper">
              <div className="form-sub-header">Membership information</div>
              <hr />
              <label>Memership number:</label>
              <div className="info">{member.id}</div>
              <label>Join Date:</label>
              <div className="info">{formatDate(member.joinDate)}</div>
              <label>Renewal Date:</label>
              <div className="info">{formatDate(member.renewalDate)}</div>
            </div>

            <div className="emergency-contacts-wrapper">
              <div className="form-sub-header">
                Emergency Contact information
              </div>
              <hr />
              <div>
                {member.emergencyContacts.map((eContact, index) => {
                  return (
                    <div key={index}>
                      <label>First Name:</label>
                      <div className="info">{eContact.firstName}</div>
                      <label>Last Name:</label>
                      <div className="info">{eContact.lastName}</div>
                      <label>Telephone:</label>
                      <div className="info">{eContact.telephone}</div>
                      <label>Relationship to member:</label>
                      <div className="info">{eContact.relationship}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="additional-requirements-wrapper">
              <div className="form-sub-header">Additional Requirements</div>
              <hr />
              <label>Medical Information:</label>
              <div className="info">{member.medicalInformation}</div>
              <label>Accessibility Requirements:</label>
              <div className="info">{member.accessibilityRequirements}</div>
            </div>

            <div className="interests-wrapper">
              <div className="form-sub-header">Interests</div>
              <hr />
              <div className="info">
                {member.interests.map((interest, index) => {
                  return <div key={index}>{interest}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
