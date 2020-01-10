import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getProceduresProfessionalsSuccess } from './actions';

export function* getProceduresProfessionals({ payload }) {
  try {
    const response = yield call(
      api.get,
      `proceduresProfessionals?id=${payload.id}`
    );
    yield put(getProceduresProfessionalsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest(
    '@procedures/GET_PROCEDURES_PROFESSIONALS_REQUEST',
    getProceduresProfessionals
  ),
]);
