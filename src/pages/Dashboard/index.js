import React, { useEffect } from 'react';
import logo from '~/assets/logo.jpeg';

export default function Dashboard() {
  useEffect(() => {}, []);

  return (
    <div className="content" style={{ background: '#F7F7F7' }}>
      <div className="container" style={{ background: '#F7F7F7' }}>
        <div
          className="jumbotron mt-4 text-center"
          style={{ background: '#F7F7F7' }}
        >
          <img
            src={logo}
            className="rounded ml-4"
            style={{ width: '300px' }}
            alt="..."
          />
          <h1 className="display-4">Olá, usuário!</h1>
          <p className="lead">Seja bem-vindo ao web agendamentos.</p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}
