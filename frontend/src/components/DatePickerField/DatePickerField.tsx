import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';

type DatePickerFieldProps = {
  name: string;
  label: string;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  ...props
}: DatePickerFieldProps) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="formGroup">
      <label htmlFor={props.name}>{label}</label>
      <DatePicker
        id={props.name}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          helpers.setValue(val);
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
      />{' '}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePickerField;
