import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { accountFailure, getAccountsSuccess } from './actions';
import history from '~/services/history';

export function* getAccounts({ payload }) {
  try {
    const response = yield call(api.get, `accounts`, payload.data);
    yield put(getAccountsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(accountFailure());
  }
}

export function* saveAccount({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'accounts', payload.data);
      toast.success('Conta cadastrada com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `accounts/${id}`, payload.data);
      toast.success('Conta atualizada com sucesso !');
      history.goBack();
    }
  } catch (error) {
    if (error.response.data && error.response.data.err) {
      toast.error(error.response.data.err.message);
    }

    yield put(accountFailure());
  }
}

export default all([
  takeLatest('@account/GET_ACCOUNTS_REQUEST', getAccounts),
  takeLatest('@account/SAVE_ACCOUNT_REQUEST', saveAccount),
]);
