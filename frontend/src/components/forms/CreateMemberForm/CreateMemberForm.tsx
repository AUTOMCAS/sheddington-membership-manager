import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

import memberService from '../../../services/member.service';
import './CreateMemberForm.css';
import TextInputField from '../TextInputField/TextInputField';
import TextareaInputField from '../TextareaInputField/TextareaInputField';
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
  accessibilityRequirements: string;
  joinDate: string;
  renewalDate: string;
  emergencyContacts: EmergencyContact[];
};

interface FormProps extends Member {
  otherInterests: string;
  customGender: string;
}

type EmergencyContact = {
  firstName: string;
  lastName: string;
  telephone: string;
  relationship: string;
};

const CreateMemberForm: React.FC = (): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState<string>('');

  const initialValues: FormProps = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    address: '',
    gender: '',
    interests: [],
    otherInterests: '',
    customGender: '',
    medicalInformation: '',
    accessibilityRequirements: '',
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

  const handleSubmit = async (values: FormProps) => {
    const member: Member = await setMemberValues(values);

    const response = await memberService.create(member);

    if (response.status === 200) {
      setDisplayMessage('Member Created');
    } else {
      const data = await response.json();
      setDisplayMessage(data.message);
    }
  };

  const setMemberValues = async (values: FormProps): Promise<Member> => {
    if (values.gender === 'Custom') {
      values.gender = values.customGender;
    }

    if (values.otherInterests !== '') {
      values.interests.push(values.otherInterests);
    }

    if (values.interests.length === 0) {
      values.interests = ['None given'];
    }

    if (values.medicalInformation === '') {
      values.medicalInformation = 'None given';
    }

    if (values.accessibilityRequirements === '') {
      values.accessibilityRequirements = 'None given';
    }

    const { otherInterests, customGender, ...memberValues } = values;

    return memberValues;
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
        gender: Yup.string()
          .oneOf(['Male', 'Female', 'Prefer not to say', 'Custom'])
          .required('Gender is required'),
        address: Yup.string().required('Address is required'),
        joinDate: Yup.date().required('Join date is required'),
        renewalDate: Yup.string().required('Renewal date is required'),
        emergencyContacts: Yup.array().of(
          Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            telephone: Yup.string()
              .required('Telephone number is required')
              .min(10, 'Telephone number must be at least 10 characters')
              .max(15, 'Telephone number must not exceed 15 characters'),
            relationship: Yup.string().required('Relationship is required'),
          }),
        ),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <div className="create-member-page">
          <div className="form-wrapper" data-test="memberForm">
            <div className="form-header">New Member Form</div>
            <div className="field-warning">
              Fields marked with * are required
            </div>
            <Form className="form" data-test="memberForms">
              <div className="personal-information-wrapper">
                <div className="form-sub-header">Personal Information</div>
                <div className="grid-content">
                  <TextInputField
                    label="First Name*"
                    name="firstName"
                    type="text"
                    placeholder="First Name*"
                    data-test="firstNameInput"
                  />

                  <TextInputField
                    label="Last Name*"
                    name="lastName"
                    type="text"
                    placeholder="Last Name*"
                    data-test="lastNameInput"
                  />

                  <TextInputField
                    label="Email*"
                    name="email"
                    type="text"
                    placeholder="email@email.com*"
                    data-test="emailInput"
                  />

                  <TextInputField
                    label="Telephone*"
                    name="telephone"
                    type="text"
                    placeholder="Telephone*"
                    data-test="telephoneInput"
                  />

                  <div className="address-wrapper">
                    <Field
                      className="address-input-field"
                      label="Address*"
                      name="address"
                      as="textarea"
                      placeholder="Address*"
                      data-test="addressInput"
                    />
                    {touched.address && errors.address ? (
                      <div className="error">{errors.address}</div>
                    ) : null}
                  </div>

                  <div className="gender-wrapper">
                    <label className="gender-label">Gender*</label>

                    <div
                      className="gender-radio-group"
                      role="group"
                      aria-labelledby="gender-radio-group"
                    >
                      <label>
                        <Field type="radio" name="gender" value="Male" />
                        Male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="Female" />
                        Female
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="Prefer not to say"
                        />
                        Prefer not to say
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="Custom" />
                        Custom
                      </label>
                      <Field
                        className="custom-gender-input"
                        name="customGender"
                        type="text"
                        placeholder="Custom Gender"
                        data-test="customGenderInput"
                      />
                    </div>
                    {touched.gender && errors.gender ? (
                      <div className="error">{errors.gender}</div>
                    ) : null}
                  </div>
                </div>
                <hr />
              </div>

              <div className="additional-requirements-wrapper">
                <div className="form-sub-header">Additional Requirements</div>
                <TextareaInputField
                  label="Medical Information"
                  name="medicalInformation"
                  type="textarea"
                  placeholder="Medical Information"
                  data-test="medicalInformationInput"
                />

                <TextareaInputField
                  label="Accessibility Requirements"
                  name="accessibilityRequirements"
                  type="textarea"
                  placeholder="Accessibility Requirements"
                  data-test="accessibilityRequirementsInput"
                />
                <hr />
              </div>

              <div id="checkbox-group" className="interests-wrapper">
                <div className="form-sub-header">Interests</div>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="checkbox-wrapper"
                >
                  <label>
                    <Field
                      type="checkbox"
                      name="interests"
                      value="Arts & Crafts"
                    />
                    Arts & Crafts
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="Cooking" />
                    Cooking
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="Gardening" />
                    Gardening
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="interests"
                      value="Making and Mending"
                    />
                    Making and Mending
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="interests"
                      value="Meeting & Socialising"
                    />
                    Meeting & Socialising
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="Walking" />
                    Walking
                  </label>
                </div>
                <TextInputField
                  label="Other Interests"
                  type="text"
                  name="otherInterests"
                  placeholder="Additional interests"
                />
                <hr />
              </div>

              <div className="dates-wrapper">
                <div className="form-sub-header">Membership information</div>
                <div className="grid-content">
                  <DatePickerField
                    name="joinDate"
                    label="Join Date*"
                    placeholder="Join Date*"
                  />

                  <DatePickerField
                    name="renewalDate"
                    label="Renewal Date*"
                    placeholder="Renewal Date*"
                  />
                </div>
                <hr />
              </div>

              <div className="emergency-contacts-wrapper ">
                <div className="form-sub-header">
                  Emergency Contact Information
                </div>
                <div className="grid-content">
                  <TextInputField
                    label="First Name*"
                    name="emergencyContacts[0].firstName"
                    type="text"
                    placeholder="First Name*"
                    data-test="eCFirstNameInput"
                  />

                  <TextInputField
                    label="Last Name*"
                    name="emergencyContacts[0].lastName"
                    type="text"
                    placeholder="Last Name*"
                    data-test="eCLastNameInput"
                  />

                  <TextInputField
                    label="Telephone*"
                    name="emergencyContacts[0].telephone"
                    type="text"
                    placeholder="Telephone*"
                    data-test="eCTelephoneInput"
                  />

                  <TextInputField
                    label="Relationship*"
                    name="emergencyContacts[0].relationship"
                    type="text"
                    placeholder="Relationship to member*"
                    data-test="eCRelationshipInput"
                  />
                </div>
              </div>

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
                <button className="back-button" data-test="back-button">
                  Back to Members
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default CreateMemberForm;
