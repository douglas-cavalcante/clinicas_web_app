import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '~/components/Header';
import Table from '~/components/Table';

import history from '~/services/history';
import api from '~/services/api';
import {
  getProfessionalScheduleRequest,
  professionalScheduleFailure,
} from '~/store/modules/professionalSchedule/actions';

const columns = [
  {
    dataField: 'day',
    text: 'Dia',
  },
  {
    dataField: 'start',
    text: 'Inicio',
  },
  {
    dataField: 'end',
    text: 'Fim',
  },
  {
    dataField: 'duration',
    text: 'Duração',
  },
  {
    dataField: 'room',
    text: 'SALA',
  },
];

export default function ProfessionalScheduleList({ match }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);

  const [currentProfessional, setCurrentProfessional] = useState('');
  const professionalSchedule = useSelector(state => state.professionalSchedule);

  function handleRedirectToEditPage(item) {
    history.push(`/${id}/agenda/${item.id}`);
  }

  async function loadProfessional() {
    await api.get(`professionals/${id}`).then(response => {
      setCurrentProfessional(response.data.name);
    });
  }

  useEffect(() => {
    dispatch(getProfessionalScheduleRequest(id));
    if (id) loadProfessional();
  }, []);

  return (
    <>
      <Header
        title={`Agenda : ${currentProfessional}`}
        buttonTitle="Inserir novo horário"
        path={`/${id}/agenda/nova`}
      />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={professionalSchedule.data}
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
