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
  disabled,
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
            disabled={disabled}
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
            disabled={disabled}
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
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  handleOnBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  mask: false,
  disabled: false,
  placeholder: '',
  handleOnBlur: () => {},
  error: '',
};
