import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getProfessionalsSuccess,
  professionalsFailure,
  getProfessionalsOptionsSuccess,
} from './actions';
import history from '~/services/history';

export function* saveProfessional({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'professionals', payload.data);
      toast.success('Profissional cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `professionals/${id}`, payload.data);
      toast.success('Profissional atualizado com sucesso !');
      history.goBack();
    }
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(professionalsFailure());
  }
}

export function* getProfessionals() {
  try {
    const response = yield call(api.get, `professionals`);
    yield put(getProfessionalsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(professionalsFailure());
  }
}

export function* getProfessionalsOptions() {
  try {
    const response = yield call(api.get, `professionals/options`);
    yield put(getProfessionalsOptionsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(professionalsFailure());
  }
}

export default all([
  takeLatest('@professionals/GET_PROFESSIONALS_REQUEST', getProfessionals),
  takeLatest('@professionals/SAVE_PROFESSIONAL_REQUEST', saveProfessional),
  takeLatest(
    '@professionals/GET_PROFESSIONALS_OPTIONS_REQUEST',
    getProfessionalsOptions
  ),
]);
