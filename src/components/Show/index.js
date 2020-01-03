import React from 'react';
import PropTypes from 'prop-types';

export default function Show({ display, children }) {
  if (display) {
    return <>{children}</>;
  }
  return null;
}

Show.propTypes = {
  /** Condição para renderizar o contéudo */
  display: PropTypes.bool.isRequired,
  /** Contéudo JSX que irá ser renderizado */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
