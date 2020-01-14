import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

export default function AuthLayout({ children }) {
  return (
    <div className="hold-transition login-page">
      <ToastContainer autoClose={3000} />
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
