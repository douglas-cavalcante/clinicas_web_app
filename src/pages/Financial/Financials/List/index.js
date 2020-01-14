import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import { getFinancialsRequest } from '~/store/modules/financial/financials/actions';
import Row from '~/components/Bootstrap/Row';

const columns = [
  {
    dataField: 'value',
    text: 'Valor',
  },
  {
    dataField: 'date',
    text: 'Data',
  },
  {
    dataField: 'account',
    text: 'Conta',
  },
  {
    dataField: 'transaction_type',
    text: 'Movimentação',
  },
];

export default function FinancialsList() {
  const dispatch = useDispatch();

  const financials = useSelector(state => state.financials);

  useEffect(() => {
    dispatch(getFinancialsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`/movimentacoes/${item.id}`);
  }

  return (
    <>
      <Header
        title="Movimentações financeiras"
        buttonTitle="Nova movimentação"
        path="/movimentacoes/nova"
      />

      <div className="content">
        <div className="container">
          <Row>
            <div className="col-md-4">
              <div className="small-box bg-success">
                <div className="inner">
                  <p>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Entradas</font>
                    </font>
                  </p>
                  <h3>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>
                        {financials.inputs}
                      </font>
                    </font>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="small-box bg-danger">
                <div className="inner">
                  <p>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Saídas</font>
                    </font>
                  </p>
                  <h3>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>
                        - {financials.outputs}
                      </font>
                    </font>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="small-box bg-info">
                <div className="inner">
                  <p>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>Saldo</font>
                    </font>
                  </p>
                  <h3>
                    <font style={{ verticalAlign: 'inherit' }}>
                      <font style={{ verticalAlign: 'inherit' }}>
                        {financials.balance}
                      </font>
                    </font>
                  </h3>
                </div>
              </div>
            </div>
          </Row>
          <Table
            keyField="name"
            data={financials.data}
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
FinancialsList.propTypes = {
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
