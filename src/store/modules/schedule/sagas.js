import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getSchedulesSuccess,
  getMySchedulesSuccess,
  scheduleFailure,
} from './actions';
import history from '~/services/history';

export function* getSchedules({ payload }) {
  try {
    const response = yield call(api.post, `schedules`, payload.data);
    yield put(getSchedulesSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(scheduleFailure());
  }
}

export function* getMySchedules({ payload }) {
  try {
    const response = yield call(api.post, `mySchedules`, payload.data);
    yield put(getMySchedulesSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(scheduleFailure());
  }
}

export function* saveSchedule({ payload }) {
  try {
    yield call(api.post, 'schedules/new', payload.data);
    toast.success('Agendando com sucesso !');
    history.goBack();
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(scheduleFailure());
  }
}

export default all([
  takeLatest('@schedules/GET_SCHEDULE_REQUEST', getSchedules),
  takeLatest('@schedules/GET_MY_SCHEDULE_REQUEST', getMySchedules),
  takeLatest('@schedules/SAVE_SCHEDULE_REQUEST', saveSchedule),
]);
