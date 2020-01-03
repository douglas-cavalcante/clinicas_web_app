import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import api from '~/services/api';

import { getRoomsRequest } from '~/store/modules/room/actions';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
];

export default function RoomList() {
  const dispatch = useDispatch();

  const room = useSelector(state => state.room);

  useEffect(() => {
    dispatch(getRoomsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`/salas/${item.id}`);
  }

  function handleChangeStatus(item) {
    api
      .put(`rooms/${item.id}/status`)
      .then(() => {
        dispatch(getRoomsRequest());
        toast.success('Status do registro atualizado com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao tentar alterar o Status do registro');
      });
  }

  return (
    <>
      <Header title="Salas" buttonTitle="Nova sala" path="/salas/nova" />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={room.data}
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
                keyConditionButtonText: 'active',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
