import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getSchedulesReportSuccess } from './actions';
import history from '~/services/history';

import { formatValues } from '~/utils/utils';

export function* getSchedules({ payload }) {
  try {
    const response = yield call(api.post, `scheduleReport`, {
      ...payload.data,
      startDate: new Date(
        payload.data.startDate.getFullYear(),
        payload.data.startDate.getMonth(),
        payload.data.startDate.getDate()
      ),
      endDate: new Date(
        payload.data.endDate.getFullYear(),
        payload.data.endDate.getMonth(),
        payload.data.endDate.getDate()
      ),
    });

    const parseData = response.data.map(item => {
      item.value_transferred_mask = formatValues(item.value_transferred);
      item.value_payment_mask = formatValues(item.value_payment);
      return item;
    });
    yield put(getSchedulesReportSuccess(parseData));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest('@schedule_report/GET_SCHEDULES_REPORT_REQUEST', getSchedules),
]);
