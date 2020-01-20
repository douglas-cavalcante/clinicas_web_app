import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function DropdownButton({ buttonLabel, headerLabel, options }) {
  const [dropdownOpen, setOpen] = useState(false);

  function toggle() {
    setOpen(!dropdownOpen);
  }

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="btn btn-light" caret>
        {buttonLabel}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{headerLabel}</DropdownItem>
        {options.map(option => (
          <DropdownItem onClick={option.onClick}>{option.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

DropdownButton.defaultProps = {
  buttonLabel: 'Button',
  headerLabel: 'Opções',
};

DropdownButton.propTypes = {
  buttonLabel: PropTypes.element,
  headerLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
