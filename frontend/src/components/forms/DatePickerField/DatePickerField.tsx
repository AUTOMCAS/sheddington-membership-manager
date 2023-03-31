import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';

import './DatePickerField.css';

type DatePickerFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  placeholder,
  ...props
}: DatePickerFieldProps) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="date-picker-field-wrapper">
      <label htmlFor={props.name}>{label}</label>
      <DatePicker
        id={props.name}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          helpers.setValue(val);
        }}
        dateFormat="dd/MM/yyyy"
        autoComplete="off"
        placeholderText={placeholder}
      />{' '}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePickerField;
