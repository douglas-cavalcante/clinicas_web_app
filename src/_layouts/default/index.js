import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import Wrapper from '~/components/Wrapper';

import ContentWrapper from '~/components/ContentWrapper';
import Navbar from '~/components/Navbar';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>
        <ToastContainer autoClose={3000} />
        {children}
      </ContentWrapper>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
