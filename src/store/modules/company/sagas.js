import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getCompanySuccess,
  SaveCompanySuccess,
  getCompanyFailure,
} from './actions';

export function* getCompany() {
  try {
    const response = yield call(api.get, 'company/1');

    yield put(getCompanySuccess(response.data));
  } catch (error) {
    yield put(getCompanyFailure());
  }
}

export function* saveCompany({ payload }) {
  try {
    const response = yield call(api.put, 'company/1', payload.data);
    toast.success('Empresa atualizada com sucesso !');
    yield put(SaveCompanySuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(getCompanyFailure());
  }
}

export default all([
  takeLatest('@company/GET_COMPANY_REQUEST', getCompany),
  takeLatest('@company/SAVE_COMPANY_REQUEST', saveCompany),
]);
