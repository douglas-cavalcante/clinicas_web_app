import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
  getUsersOptionsRequest,
  getUsersOptionsSuccess,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, verifique seus dados!');
    yield put(updateProfileFailure());
  }
}

export function* getUsersOptions() {
  try {
    const response = yield call(api.get, `users/options`);
    yield put(getUsersOptionsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/GET_USERS_OPTIONS_REQUEST', getUsersOptions),
]);
