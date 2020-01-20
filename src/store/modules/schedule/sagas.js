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
    const response = yield call(api.post, `schedules`, {
      ...payload.data,
      date: new Date(
        payload.data.date.getFullYear(),
        payload.data.date.getMonth(),
        payload.data.date.getDate()
      ),
    });
    yield put(getSchedulesSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(scheduleFailure());
  }
}

export function* getMySchedules({ payload }) {
  try {
    const response = yield call(api.post, `mySchedules`, {
      ...payload.data,
      date: new Date(
        payload.data.date.getFullYear(),
        payload.data.date.getMonth(),
        payload.data.date.getDate()
      ),
    });
    yield put(getMySchedulesSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(scheduleFailure());
  }
}

export function* saveSchedule({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'schedules/new', {
        ...payload.data,
        date: new Date(
          payload.data.date.getFullYear(),
          payload.data.date.getMonth(),
          payload.data.date.getDate()
        ),
      });
      toast.success('Agendando com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `schedules/${id}`, {
        ...payload.data,
      });
      toast.error('Atualizado com sucesso');
      history.goBack();
    }
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(scheduleFailure());
  }
}

export function* saveScheduleEncaixe({ payload }) {
  try {
    yield call(api.post, 'schedules/manually', {
      ...payload.data,
      date: new Date(
        payload.data.date.getFullYear(),
        payload.data.date.getMonth(),
        payload.data.date.getDate()
      ),
    });
    toast.success('Encaixado com sucesso !');
    history.push('/agendamentos');
  } catch (error) {
    toast.error('Houve um erro ao tentar adicionar o encaixe.');
    yield put(scheduleFailure());
  }
}

export default all([
  takeLatest('@schedules/GET_SCHEDULE_REQUEST', getSchedules),
  takeLatest('@schedules/GET_MY_SCHEDULE_REQUEST', getMySchedules),
  takeLatest('@schedules/SAVE_SCHEDULE_REQUEST', saveSchedule),
  takeLatest('@schedules/SAVE_SCHEDULE_ENCAIXE_REQUEST', saveScheduleEncaixe),
]);
