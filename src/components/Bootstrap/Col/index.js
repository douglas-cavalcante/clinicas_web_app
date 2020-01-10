import React from 'react';

// import { Container } from './styles';

export default function Col({ type, length, children }) {
  return <div className={`col-${type}-${length}`}>{children}</div>;
}
