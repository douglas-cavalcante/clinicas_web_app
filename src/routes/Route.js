import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { store } from '../store';

import AuthLayout from '~/_layouts/auth';

import DefaultLayout from '~/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  permissions = [],
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { profile } = store.getState().user;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (
    signed &&
    !isPrivate &&
    !permissions.includes(profile.professional.role_id)
  ) {
    return <Redirect to="/home" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }

  if (profile && profile.professional) {
    if (
      profile.professional &&
      !permissions.includes(profile.professional.role_id)
    ) {
      return <Redirect to="/home" />;
    }
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  permissions: PropTypes.array,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
