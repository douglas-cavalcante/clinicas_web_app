import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import api from '~/services/api';
import { getProceduresRequest } from '~/store/modules/procedure/actions';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
];

export default function ProceduresList({ match, location }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);

  const currentPartnership = useMemo(() => location.state.name, [
    location.state.name,
  ]);

  const procedure = useSelector(state => state.procedure);

  useEffect(() => {
    dispatch(getProceduresRequest(id));
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`/procedimentos/${item.id}`);
  }

  function handleRedirectToAllocate(item) {
    history.push(`/${item.id}/procedimentos/alocar`);
  }

  function handleChangeStatus(item) {
    api
      .put(`procedures/${item.id}/status`)
      .then(() => {
        dispatch(getProceduresRequest(id));
        toast.success('Status do registro atualizado com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao tentar alterar o Status do registro');
      });
  }

  return (
    <>
      <Header
        title={`Procedimentos - ${currentPartnership}`}
        buttonTitle="Novo procedimento"
        path={`/${id}/procedimentos/novo`}
      />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={procedure.data}
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
                text: 'Status',
                className: 'btn btn-sm btn-danger',
                onClick: handleChangeStatus,
                buttonText: 'Bloquear',
                keyConditionButtonText: 'status',
              },
              {
                text: 'Profissionais',
                className: 'btn btn-sm btn-warning',
                onClick: handleRedirectToAllocate,
                buttonText: 'Alocar',
                keyConditionButtonText: null,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

ProceduresList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
