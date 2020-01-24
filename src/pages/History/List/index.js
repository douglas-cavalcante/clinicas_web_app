import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import { formatValues } from '~/utils/utils';
import { MdTimer, MdBookmark, MdPerson, MdList, MdFace } from 'react-icons/md';

import Header from '~/components/Header';
import api from '~/services/api';
import Show from '~/components/Show';

export default function HistoryList({ match }) {
  const [history, setHistory] = useState([]);

  const id = useMemo(() => match.params.id, [match.params.id]);

  useEffect(() => {
    async function loadHistory() {
      api.get(`history/${id}`).then(response => {
        setHistory(response.data);
      });
    }

    loadHistory();
  });
  return (
    <>
      <Header title="Histórico do paciente" />

      {history.length > 0 &&
        history.map(item => {
          return (
            <div className="content">
              <div className="container">
                <div className="timeline">
                  <div className="time-label">
                    <span className="bg-green">{` Marcada para: ${item.date}`}</span>
                  </div>
                  <div>
                    <Show display={item.status === 'Agendado'}>
                      <MdBookmark color="#CCC" size={30} />
                    </Show>
                    <Show display={item.status === 'Pré-Confirmado'}>
                      <MdBookmark color="#ffa500" size={30} />
                    </Show>
                    <Show display={item.status === 'Cancelado'}>
                      <MdBookmark color="tomato" size={30} />
                    </Show>
                    <Show display={item.status === 'Confirmado'}>
                      <MdBookmark color="#218838" size={30} />
                    </Show>
                    <Show display={item.status === 'Autorizado'}>
                      <MdBookmark color="#007BFF" size={30} />
                    </Show>
                    <Show display={item.status === 'Finalizado'}>
                      <MdBookmark color="#993399" size={30} />
                    </Show>
                    <div className="timeline-item">
                      <span className="time">{item.start}</span>

                      <h3 className="timeline-header">
                        {item.status} {` - ${formatValues(item.value)}`}
                      </h3>

                      <div className="timeline-body">
                        <div className="card card-primary">
                          <div className="card-body">
                            <strong>
                              <MdFace color="#007BFF" size={30} />
                              <font style={{ verticalAlign: 'center' }}>
                                <font style={{ verticalAlign: 'center' }}>
                                  {' '}
                                  Profissional: {item.professional.name}
                                </font>
                              </font>
                            </strong>

                            <hr />

                            <strong>
                              <MdList color="#007BFF" size={30} />
                              <font style={{ verticalAlign: 'center' }}>
                                <font style={{ verticalAlign: 'center' }}>
                                  {' '}
                                  Procedimento:
                                  {item.procedure.name} {' | '} {item.room.name}
                                </font>
                              </font>
                            </strong>

                            <hr />

                            <strong>
                              <font style={{ verticalAlign: 'center' }}>
                                <font style={{ verticalAlign: 'center' }}>
                                  <MdPerson color="#007BFF" size={30} />
                                  Paciente: {item.patient}
                                </font>
                              </font>
                            </strong>

                            <p className="text-muted">
                              <span className="tag tag-danger">
                                <font style={{ verticalAlign: 'center' }}>
                                  <font style={{ verticalAlign: 'center' }}>
                                    {' '}
                                  </font>
                                </font>
                              </span>
                            </p>

                            <hr />

                            <strong>
                              <MdTimer color="#007BFF" size={30} />
                              <font style={{ verticalAlign: 'center' }}>
                                <font style={{ verticalAlign: 'center' }}>
                                  Observações do agendamento:{' '}
                                </font>
                              </font>
                            </strong>

                            <p className="text-muted">
                              <font style={{ verticalAlign: 'center' }}>
                                <font
                                  style={{
                                    verticalAlign: 'center',
                                    marginLeft: 10,
                                  }}
                                >
                                  {item.observations}
                                </font>
                              </font>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

HistoryList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
