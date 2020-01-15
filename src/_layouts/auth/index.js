import React from 'react';
import PropTypes from 'prop-types';

export default function AuthLayout({ children }) {
  return (
    <div
      className="hold-transition login-page"
      style={{ background: '#F7F7F7' }}
    >
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
