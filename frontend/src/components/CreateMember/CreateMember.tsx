import React from 'react';

const CreateMember: React.FC = () => {
  return (
    <form className="createMemberInput">
      <input
        type="input"
        placeholder="First Name"
        id="firstName"
        data-test="firstNameInput"
      />
    </form>
  );
};

export default CreateMember;
