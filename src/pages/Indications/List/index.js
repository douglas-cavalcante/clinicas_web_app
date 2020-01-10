import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import { getIndicationsRequest } from '~/store/modules/indication/actions';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
];

export default function IndicationList() {
  const dispatch = useDispatch();

  const indication = useSelector(state => state.indication);

  useEffect(() => {
    dispatch(getIndicationsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`/indicacoes/${item.id}`);
  }

  return (
    <>
      <Header
        title="Indicações"
        buttonTitle="Nova indicação"
        path="/indicacoes/nova"
      />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={indication.data}
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
