import React from 'react';

import PropTypes from 'prop-types';

export default function Textarea({
  col,
  label,
  value,
  name,
  onChange,
  id,
  disabled,
  placeholder,
}) {
  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          className="form-control"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="3"
          disabled
        />
      </div>
    </div>
  );
}

Textarea.propTypes = {
  col: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
