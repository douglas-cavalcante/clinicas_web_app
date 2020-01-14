import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/Header';
import Table from '~/components/Table';

import history from '~/services/history';
import { getPatientsRequest } from '~/store/modules/patient/actions';

// import { Container } from './styles';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
  {
    dataField: 'first_phone',
    text: 'Contato principal',
  },
  {
    dataField: 'cpf',
    text: 'CPF',
  },
];

export default function PatientList() {
  const dispatch = useDispatch();

  const patient = useSelector(state => state.patient);

  useEffect(() => {
    dispatch(getPatientsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`pacientes/${item.id}`);
  }

  return (
    <>
      <Header
        title="Pacientes"
        buttonTitle="Novo paciente"
        path="/pacientes/novo"
      />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={patient.data}
            columns={columns}
            extrasColumns={[
              {
                text: 'Editar',
                className: 'btn btn-sm btn-info',
                onClick: handleRedirectToEditPage,
                buttonText: 'Editar',
                keyConditionButtonText: null,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
