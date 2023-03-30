import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import memberService from '../../services/member.service';
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
  joinDate: string;
  renewalDate: string;
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
    joinDate: '',
    renewalDate: '',
  };

  const handleSubmit = async (values: Member) => {
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
      <div className="createMemberPage">
        <div>
          <Form className="form" id="createMemberInput" data-test="memberForm">
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

            <DatePickerField name="joinDate" label="Join Date" />

            <DatePickerField name="renewalDate" label="Renewal Date" />

            <div className="displayMessage" data-test="displayMessage">
              {displayMessage}
            </div>

            <div className="buttonDiv">
              <button
                className="submitButton"
                type="submit"
                data-test="submitButton"
              >
                Add Member
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default CreateMemberForm;
