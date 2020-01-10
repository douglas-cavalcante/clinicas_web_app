import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getProceduresSuccess, proceduresFailure } from './actions';
import history from '~/services/history';
import { getProceduresProfessionalsRequest } from '../procedureProfessional/actions';

export function* saveProcedure({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'procedures', payload.data);
      toast.success('Procedimento cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `procedures/${id}`, payload.data);
      toast.success('Procedimento atualizado com sucesso !');
      history.goBack();
    }
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(proceduresFailure());
  }
}

export function* setProcedureToProfessional({ payload }) {
  const { data } = payload;
  try {
    yield call(api.post, `proceduresProfessionals`, data);
    toast.success(' Profissional vinculado com sucesso !');
    yield put(getProceduresProfessionalsRequest(data.procedure_id));
  } catch (error) {
    if (error.response.data && error.response.data.err)
      toast.error(error.response.data.err.message);
  }
}

export function* getProcedures({ payload }) {
  try {
    const response = yield call(api.get, `procedures?id=${payload.id}`);
    yield put(getProceduresSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(proceduresFailure());
  }
}

export default all([
  takeLatest('@procedures/GET_PROCEDURES_REQUEST', getProcedures),
  takeLatest('@procedures/SAVE_PROCEDURE_REQUEST', saveProcedure),
  takeLatest(
    '@procedures/SAVE_PROCEDURE_TO_PROFESSIONAL_REQUEST',
    setProcedureToProfessional
  ),
]);
