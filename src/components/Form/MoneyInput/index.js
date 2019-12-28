import React from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import PropTypes from 'prop-types';

const currencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

export default function MoneyInput({ label, value, name, onChange, id, col }) {
  function handleChange(event, money) {
    event.preventDefault();
    onChange(name, money);
  }

  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        <IntlCurrencyInput
          currency="BRL"
          config={currencyConfig}
          onChange={handleChange}
          id={id}
          value={value}
          defaultValue={value}
          name={name}
          className="form-control"
        />
      </div>
    </div>
  );
}

MoneyInput.propTypes = {
  col: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
