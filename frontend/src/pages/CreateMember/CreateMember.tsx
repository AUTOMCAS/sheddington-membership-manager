import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './CreateMember.css';

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

const CreateMember: React.FC = (): JSX.Element => {
  const [displayMessage, setDisplayMessage] = useState<string>('');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    telephone: Yup.string()
      .required('Telephone number is required')
      .min(10, 'Telephone number must be at least 10 characters')
      .max(15, 'Telephone number must not exceed 15 characters'),
    gender: Yup.string().required(
      'Gender is required, enter "Unknown" or "Undisclosed if appropriate',
    ),
    address: Yup.string().required('Address is required'),
    joinDate: Yup.string().required('Address is required'),
    renewalDate: Yup.string().required('Address is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Member>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Member) => {
    let response = await fetch('http://localhost:8080/members', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      console.log(response);
      setDisplayMessage('Member Created');
    } else {
      const data = await response.json();
      setDisplayMessage(data.message);
    }
  };

  return (
    <div className="createMemberPage">
      <div>
        <form
          className="form"
          id="createMemberInput"
          onSubmit={handleSubmit(onSubmit)}
          data-test="memberForm"
        >
          <div className="formBody">
            <div className="formGroup">
              <label>First Name </label>
              <input
                type="input"
                {...register('firstName')}
                className={`form-control ${
                  errors.firstName ? 'is-invalid' : ''
                }`}
                data-test="firstNameInput"
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>

            <div className="formGroup">
              <label>Last Name </label>
              <input
                type="input"
                {...register('lastName')}
                className={`form-control ${
                  errors.lastName ? 'is-invalid' : ''
                }`}
                data-test="lastNameInput"
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input
                type="input"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                data-test="emailInput"
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="formGroup">
              <label>Telephone</label>
              <input
                type="input"
                {...register('telephone')}
                className={`form-control ${
                  errors.telephone ? 'is-invalid' : ''
                }`}
                data-test="telephoneInput"
              />
              <div className="invalid-feedback">
                {errors.telephone?.message}
              </div>
            </div>

            <div className="formGroup">
              <label>Address</label>
              <input
                type="input"
                {...register('address')}
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                data-test="addressInput"
              />
              <div className="invalid-feedback">{errors.address?.message}</div>
            </div>

            <div className="formGroup">
              <label>Gender</label>
              <input
                type="input"
                {...register('gender')}
                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                data-test="genderInput"
              />
              <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>

            <div className="formGroup">
              <label>Join Date</label>
              <input
                type="input"
                {...register('joinDate')}
                className={`form-control ${
                  errors.joinDate ? 'is-invalid' : ''
                }`}
                data-test="joinDateInput"
              />
              <div className="invalid-feedback">{errors.joinDate?.message}</div>
            </div>

            <div className="formGroup">
              <label>Renewal Date</label>
              <input
                type="input"
                {...register('renewalDate')}
                className={`form-control ${
                  errors.renewalDate ? 'is-invalid' : ''
                }`}
                data-test="renewalDateInput"
              />
              <div className="invalid-feedback">
                {errors.renewalDate?.message}
              </div>
            </div>
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
