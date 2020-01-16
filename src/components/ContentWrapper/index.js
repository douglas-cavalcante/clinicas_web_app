import React from 'react';

// import { Container } from './styles';

export default function ContentWrapper({ children }) {
  return (
    <div className="content-wrapper" style={{ background: '#F7F7F7' }}>
      {children}
    </div>
  );
}
