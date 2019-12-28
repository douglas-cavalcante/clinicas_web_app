import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getProceduresSuccess, proceduresFailure } from './actions';
import history from '~/services/history';

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
]);
