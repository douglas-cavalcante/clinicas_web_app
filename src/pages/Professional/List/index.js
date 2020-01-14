import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import Header from '~/components/Header';
import Table from '~/components/Table';
import { getProfessionalsRequest } from '~/store/modules/professional/actions';
import history from '~/services/history';

// import { Container } from './styles';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
  {
    dataField: 'role',
    text: 'Perfil',
  },
  {
    dataField: 'cpf',
    text: 'CPF',
  },
  {
    dataField: 'first_phone',
    text: 'Telefone',
  },
];

export default function ProfessionalList() {
  const dispatch = useDispatch();

  const professional = useSelector(state => state.professional);

  useEffect(() => {
    dispatch(getProfessionalsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`profissionais/${item.id}`);
  }

  function handleRedirectToUser(item) {
    history.push(`profissionais/${item.id}/usuario`);
  }

  function handleRedirectToSchedule(item) {
    if (item.role_id === 4 || item.role_id === 5) {
      history.push(`/${item.id}/agenda`);
    } else {
      toast.error(
        'Não é permitido inserir uma agenda para esse perfil de usuário.'
      );
    }
  }

  return (
    <>
      <Header
        title="Profissionais"
        buttonTitle="Novo profissional"
        path="/profissionais/novo"
      />
      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={professional.data}
            columns={columns}
            extrasColumns={[
              {
                text: 'Editar',
                className: 'btn btn-sm btn-info',
                onClick: handleRedirectToEditPage,
                buttonText: 'Editar',
                keyConditionButtonText: null,
              },
              {
                text: 'Agenda',
                className: 'btn btn-sm btn-warning',
                onClick: handleRedirectToSchedule,
                buttonText: 'Entrar',
                keyConditionButtonText: null,
                keyConditionShowButton: 'role_id',
              },
              {
                text: 'Login',
                className: 'btn btn-sm btn-info',
                onClick: handleRedirectToUser,
                buttonText: 'Disponibilizar',
                keyConditionButtonText: null,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
