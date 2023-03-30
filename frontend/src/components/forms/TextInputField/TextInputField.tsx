import React from 'react';
import { useField } from 'formik';
import './TextInputField.css';

type TextInputFieldProps = {
  id?: any;
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  ...props
}: TextInputFieldProps): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    <div className="text-input-field">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" autoComplete="off" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInputField;
