import React, { useEffect } from 'react';
import { ptBR } from 'date-fns/locale';

export default function Dashboard() {
  useEffect(() => {}, []);

  return (
    <div className="content">
      <div className="container">
        <div className="jumbotron mt-3">
          <h1 className="display-4">Olá, usuário!</h1>
          <p className="lead">Seja bem-vindo ao web agendamentos.</p>
          <hr className="my-4" />
          <p>
            Que tal começar atualizando os dados da sua empresa e inserido o
            seus horários de funcionamento !
          </p>
        </div>
      </div>
    </div>
  );
}
