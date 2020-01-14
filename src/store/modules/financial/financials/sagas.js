import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { financialFailure, getFinancialsSuccess } from './actions';
import history from '~/services/history';
import { formatValues } from '~/utils/utils';

export function* getFinancials({ payload }) {
  try {
    const response = yield call(api.get, `financials`, payload.data);

    const formatItems = response.data.data.map(item => {
      item.value = formatValues(item.value);
      return item;
    });

    const balance = formatValues(response.data.inputs - response.data.outputs);
    const inputs = formatValues(response.data.inputs);
    const outputs = formatValues(response.data.outputs);

    yield put(
      getFinancialsSuccess({
        data: formatItems,
        inputs,
        outputs,
        balance,
      })
    );
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(financialFailure());
  }
}

export function* saveFinancial({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'financials', payload.data);
      toast.success('Movimentação cadastrada com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `financials/${id}`, payload.data);
      toast.success('Movimentação atualizada com sucesso !');
      history.goBack();
    }
  } catch (error) {
    if (error.response.data && error.response.data.err) {
      toast.error(error.response.data.err.message);
    }

    yield put(financialFailure());
  }
}

export default all([
  takeLatest('@financials/GET_FINANCIALS_REQUEST', getFinancials),
  takeLatest('@financials/SAVE_FINANCIAL_REQUEST', saveFinancial),
]);
