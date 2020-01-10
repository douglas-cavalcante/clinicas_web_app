import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
// import { Container } from './styles';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerInput({ name, value, onChange }) {
  registerLocale('pt-BR', ptBR);

  function handleChange(date) {
    onChange(name, date);
  }
  return (
    <DatePicker
      onChange={handleChange}
      inline
      autoComplete="off"
      className="form-control"
      locale="pt-BR"
      value={value}
      name={name}
      selected={value}
    />
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
