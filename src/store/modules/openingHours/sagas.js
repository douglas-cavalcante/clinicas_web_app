import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getOpeningHoursSuccess,
  OpeningHoursFailure,
  saveOpeningHoursSuccess,
} from './actions';

export function* getOpeningHours() {
  try {
    const response = yield call(api.get, 'openingHours');

    yield put(getOpeningHoursSuccess(response.data));
  } catch (error) {
    yield put(OpeningHoursFailure());
  }
}

export function* saveOpeningHours({ payload }) {
  const horarios = payload.data;
  try {
    const response = yield call(api.put, 'openingHours', { horarios });
    toast.success('Horários atualizados com sucesso !');
    yield put(saveOpeningHoursSuccess());
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(OpeningHoursFailure());
  }
}

export default all([
  takeLatest('@openingHours/GET_OPENING_HOURS_REQUEST', getOpeningHours),
  takeLatest('@openingHours/SAVE_OPENING_HOURS_REQUEST', saveOpeningHours),
]);
