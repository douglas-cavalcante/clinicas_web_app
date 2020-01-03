import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function SwitchButton({
  checked,
  onChange,
  name,
  label,
  col,
  id,
}) {
  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        <BootstrapSwitchButton
          checked={checked}
          onlabel="Sim"
          onstyle="success"
          offlabel="Não"
          offstyle="danger"
          style="w-100"
          size="sm"
          onChange={val => {
            onChange(name, val);
          }}
        />
      </div>
    </div>
  );
}

SwitchButton.propTypes = {
  col: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
