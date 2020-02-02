import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getProcredureReportSuccess } from './actions';
import { formatValues } from '~/utils/utils';

export function* getProcedures({ payload }) {
  try {
    const response = yield call(api.post, `proceduresReport`, {
      ...payload.data,
    });

    const formatItems = response.data.map(item => {
      item.total = formatValues(item.total);
      return item;
    });

    yield put(getProcredureReportSuccess(formatItems));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest('@procedure_report/GET_PROCEDURE_REPORT_REQUEST', getProcedures),
]);
