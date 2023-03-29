import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import memberService from '../../services/member.service';
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
      'Gender is required. Enter "Unknown" or "Undisclosed where appropriate',
    ),
    address: Yup.string().required('Address is required'),
    joinDate: Yup.string().required('Join date is required'),
    renewalDate: Yup.string().required('Renewal date is required'),
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
    let response = await memberService.create(data);

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
                className={`formControl ${
                  errors.firstName ? 'is-invalid' : ''
                }`}
                data-test="firstNameInput"
              />
              <div className="invalidFeedback">{errors.firstName?.message}</div>
            </div>

            <div className="formGroup">
              <label>Last Name </label>
              <input
                type="input"
                {...register('lastName')}
                className={`formControl ${errors.lastName ? 'is-invalid' : ''}`}
                data-test="lastNameInput"
              />
              <div className="invalidFeedback">{errors.lastName?.message}</div>
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input
                type="input"
                {...register('email')}
                className={`formControl ${errors.email ? 'is-invalid' : ''}`}
                data-test="emailInput"
              />
              <div className="invalidFeedback">{errors.email?.message}</div>
            </div>

            <div className="formGroup">
              <label>Telephone</label>
              <input
                type="input"
                {...register('telephone')}
                className={`formControl ${
                  errors.telephone ? 'is-invalid' : ''
                }`}
                data-test="telephoneInput"
              />
              <div className="invalidFeedback">{errors.telephone?.message}</div>
            </div>

            <div className="formGroup">
              <label>Address</label>
              <input
                id="addressInput"
                type="input"
                {...register('address')}
                className={`formControl ${errors.address ? 'is-invalid' : ''}`}
                data-test="addressInput"
              />
              <div className="invalidFeedback">{errors.address?.message}</div>
            </div>

            <div className="formGroup">
              <label>Gender</label>
              <input
                type="input"
                {...register('gender')}
                className={`formControl ${errors.gender ? 'is-invalid' : ''}`}
                data-test="genderInput"
              />
              <div className="invalidFeedback">{errors.gender?.message}</div>
            </div>

            <div className="formGroup">
              <label>Join Date</label>
              <input
                type="input"
                {...register('joinDate')}
                className={`formControl ${errors.joinDate ? 'is-invalid' : ''}`}
                data-test="joinDateInput"
              />
              <div className="invalidFeedback">{errors.joinDate?.message}</div>
            </div>

            <div className="formGroup">
              <label>Renewal Date</label>
              <input
                type="input"
                {...register('renewalDate')}
                className={`formControl ${
                  errors.renewalDate ? 'is-invalid' : ''
                }`}
                data-test="renewalDateInput"
              />
              <div className="invalidFeedback">
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
