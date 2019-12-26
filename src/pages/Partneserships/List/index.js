import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import { getPartnesershipsRequest } from '~/store/modules/partnership/actions';
import api from '~/services/api';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
];

export default function PartnershipsList() {
  const dispatch = useDispatch();

  const partnership = useSelector(state => state.partnership);

  useEffect(() => {
    dispatch(getPartnesershipsRequest());
  }, []);

  function handleRedirectToProcedures(item) {
    history.push(`/${item.name}/procedimentos`);
  }

  function handleRedirectToEditPage(item) {
    history.push(`convenios/${item.id}`);
  }

  function handleChangeStatus(item) {
    api
      .put(`partnerships/${item.id}/status`)
      .then(() => {
        dispatch(getPartnesershipsRequest());
        toast.success('Status do registro atualizado com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao tentar alterar o Status do registro');
      });
  }

  return (
    <>
      <Header
        title="Convênios"
        buttonTitle="Novo convênio"
        path="/convenios/novo"
      />

      <div className="content">
        <div className="container">
          <Table
            keyField="id"
            data={partnership.data}
            columns={columns}
            extrasColumns={[
              {
                text: 'Procedimentos',
                className: 'btn btn-sm btn-warning',
                onClick: handleRedirectToProcedures,
                buttonText: 'Entrar',
                keyConditionButtonText: null,
              },
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
            ]}
          />
        </div>
      </div>
    </>
  );
}
