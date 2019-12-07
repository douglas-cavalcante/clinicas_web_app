import React from 'react';
import { Container, Title } from './styles';

export default function Description({ icon, title }) {
  return (
    <Container>
      {icon}
      <Title>{title}</Title>
    </Container>
  );
}
