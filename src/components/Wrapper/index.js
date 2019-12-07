import React from 'react';

// import { Container } from './styles';

export default function Wrapper({ children }) {
  return (
    <div className="wrapper">
      <div className="content-wrapper">{children}</div>
    </div>
  );
}
