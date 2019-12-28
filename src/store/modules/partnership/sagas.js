import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  savePartnesershipSuccess,
  partnesershipFailure,
  getPartnesershipsSuccess,
} from './actions';
import history from '~/services/history';

export function* savePartnesership({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'partnerships', payload.data);
      toast.success('Convênio cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `partnerships/${id}`, payload.data);
      toast.success('Convênio atualizado com sucesso !');
      history.goBack();
    }
    yield put(savePartnesershipSuccess());
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(partnesershipFailure());
  }
}

export function* getPartneserships() {
  try {
    const response = yield call(api.get, 'partnerships');
    yield put(getPartnesershipsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(partnesershipFailure());
  }
}

export default all([
  takeLatest('@partnesership/SAVE_COMPANY_REQUEST', savePartnesership),
  takeLatest('@partnesership/GET_PARTNESERSHIPS_REQUEST', getPartneserships),
]);
