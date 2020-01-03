import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import { Container } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerInput({ inline }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      className="form-control"
      inline={inline}
    />
  );
}
