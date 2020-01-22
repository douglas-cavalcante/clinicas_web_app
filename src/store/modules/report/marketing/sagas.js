import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getMarketingReportSuccess } from './actions';

export function* getMarketing({ payload }) {
  try {
    const response = yield call(api.post, `marketingReport`, {
      ...payload.data,
    });

    yield put(getMarketingReportSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest('@marketing_report/GET_MARKETING_REPORT_REQUEST', getMarketing),
]);
