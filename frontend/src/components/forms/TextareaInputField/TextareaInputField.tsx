import React from 'react';
import { useField } from 'formik';
import './TextareaInputField.css';

type TextareaInputFieldProps = {
  id?: any;
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

const TextareaInputField: React.FC<TextareaInputFieldProps> = ({
  label,
  ...props
}: TextareaInputFieldProps): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    <div className="textarea-input-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className="textarea-input"
        autoComplete="off"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextareaInputField;
