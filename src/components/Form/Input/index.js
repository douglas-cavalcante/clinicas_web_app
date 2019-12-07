import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

export default function Input({
  col,
  label,
  value,
  name,
  onChange,
  id,
  type,
  placeholder,
  mask,
  handleOnBlur,
  error,
}) {
  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        {mask && (
          <InputMask
            type={type}
            className={`form-control ${error && 'is-invalid'}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            mask={mask}
            onBlur={handleOnBlur}
          />
        )}
        {!mask && (
          <input
            type={type}
            className="form-control "
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  col: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  mask: PropTypes.bool,
  handleOnBlur: PropTypes.func,
  error: PropTypes.string.isRequired,
};

Input.defaultProps = {
  mask: false,
  handleOnBlur: () => {},
};
