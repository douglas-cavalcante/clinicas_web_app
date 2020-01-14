import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';

import { getAccountsRequest } from '~/store/modules/financial/account/actions';

const columns = [
  {
    dataField: 'name',
    text: 'Nome',
  },
];

export default function AccountList({ match }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);

  const account = useSelector(state => state.account);

  useEffect(() => {
    dispatch(getAccountsRequest());
  }, []);

  function handleRedirectToEditPage(item) {
    history.push(`/accounts/${item.id}`);
  }

  return (
    <>
      <Header title="Contas" buttonTitle="Nova conta" path="/contas/nova" />

      <div className="content">
        <div className="container">
          <Table
            keyField="name"
            data={account.data}
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

AccountList.propTypes = {
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
