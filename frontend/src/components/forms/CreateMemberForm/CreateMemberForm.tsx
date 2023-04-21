import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

import memberService from '../../../services/member.service';
import './CreateMemberForm.css';
import TextInputField from '../TextInputField/TextInputField';
import DatePickerField from '../DatePickerField/DatePickerField';

type Member = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  interests: string[];
  medicalInformation: string;
  specialRequirements: string;
  joinDate: string;
  renewalDate: string;
  emergencyContacts: EmergencyContact[];
};

type EmergencyContact = {
  firstName: string;
  lastName: string;
  telephone: string;
  relationship: string;
};

const CreateMemberForm: React.FC = (): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState<string>('');

  const initialValues: Member = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    address: '',
    gender: '',
    interests: [],
    medicalInformation: '',
    specialRequirements: '',
    joinDate: '',
    renewalDate: '',
    emergencyContacts: [
      {
        firstName: '',
        lastName: '',
        telephone: '',
        relationship: '',
      },
    ],
  };

  const handleSubmit = async (values: Member) => {
    console.log('Values: ', values);
    let response = await memberService.create(values);

    if (response.status === 200) {
      setDisplayMessage('Member Created');
    } else {
      const data = await response.json();
      setDisplayMessage(data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        telephone: Yup.string()
          .required('Telephone number is required')
          .min(10, 'Telephone number must be at least 10 characters')
          .max(15, 'Telephone number must not exceed 15 characters'),
        gender: Yup.string().required(
          'Gender is required. Enter "Unknown" or "Undisclosed where appropriate',
        ),
        address: Yup.string().required('Address is required'),
        joinDate: Yup.date().required('Join date is required'),
        renewalDate: Yup.string().required('Renewal date is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      <div className="create-member-page">
        <div className="form" data-test="memberForm">
          <Form>
            <TextInputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
              data-test="firstNameInput"
            />

            <TextInputField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              data-test="lastNameInput"
            />

            <TextInputField
              label="Email"
              name="email"
              type="text"
              placeholder="email@email.com"
              data-test="emailInput"
            />

            <TextInputField
              label="Telephone"
              name="telephone"
              type="text"
              placeholder="Telephone"
              data-test="telephoneInput"
            />

            <TextInputField
              label="Address"
              name="address"
              type="text"
              placeholder="Address"
              data-test="addressInput"
            />

            <TextInputField
              label="Gender"
              name="gender"
              type="text"
              placeholder="Gender"
              data-test="genderInput"
            />

            <div id="checkbox-group">Interests</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field
                  type="checkbox"
                  name="interests"
                  value="Making and Mending"
                />
                Making and Mending
              </label>
              <label>
                <Field type="checkbox" name="interests" value="Gardening" />
                Gardening
              </label>
              <label>
                <Field type="checkbox" name="interests" value="Craft" />
                Craft
              </label>
            </div>

            <TextInputField
              label="Medical Information"
              name="medicalInformation"
              type="text"
              placeholder="Medical Information"
              data-test="medicalInformationInput"
            />

            <TextInputField
              label="Special Requirements"
              name="specialRequirements"
              type="text"
              placeholder="Special Requirements"
              data-test="specialRequirementsInput"
            />

            <DatePickerField
              name="joinDate"
              label="Join Date"
              placeholder="Join Date"
            />

            <DatePickerField
              name="renewalDate"
              label="Renewal Date"
              placeholder="Renewal Date"
            />

            <TextInputField
              label="First Name"
              name="emergencyContacts[0].firstName"
              type="text"
              placeholder="Emergency Contact's First Name"
              data-test="eCFirstNameInput"
            />

            <TextInputField
              label="Last Name"
              name="emergencyContacts[0].lastName"
              type="text"
              placeholder="Emergency Contact's Last Name"
              data-test="eCLastNameInput"
            />

            <TextInputField
              label="Telephone"
              name="emergencyContacts[0].telephone"
              type="text"
              placeholder="Emergency Contact's Telephone"
              data-test="eCTelephoneInput"
            />

            <TextInputField
              label="Relationship"
              name="emergencyContacts[0].relationship"
              type="text"
              placeholder="Emergency Contact's Relationship to member"
              data-test="eCRelationshipInput"
            />
            <div className="display-message" data-test="display-message">
              {displayMessage}
            </div>
            <div className="submit-button-container">
              <button
                className="submit-button"
                type="submit"
                data-test="submit-button"
              >
                Add Member
              </button>
            </div>
          </Form>
          <div className="back-button-container">
            <a href="/members">
              {' '}
              <button className="back-button" data-test="back-button">
                Back to Members
              </button>
            </a>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default CreateMemberForm;
