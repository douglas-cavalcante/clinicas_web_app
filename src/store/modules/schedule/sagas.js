import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getSchedulesSuccess, scheduleFailure } from './actions';

export function* getSchedules({ payload }) {
  try {
    const response = yield call(api.post, `schedules`, payload.data);
    yield put(getSchedulesSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(scheduleFailure());
  }
}

export default all([
  takeLatest('@schedules/GET_SCHEDULE_REQUEST', getSchedules),
]);
