import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getFinancialReportSuccess } from './actions';
import { formatValues } from '~/utils/utils';

export function* getFinancialReport({ payload }) {
  try {
    const response = yield call(api.post, `financialReport`, {
      ...payload.data,
    });

    const formatItems = response.data.map(item => {
      item.value = formatValues(item.value);
      return item;
    });

    yield put(getFinancialReportSuccess(formatItems));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest(
    '@financial_report/GET_FINANCIAL_REPORT_REQUEST',
    getFinancialReport
  ),
]);
