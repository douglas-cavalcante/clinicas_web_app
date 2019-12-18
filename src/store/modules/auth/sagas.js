import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';


import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;



    toast.success('Sua conta foi criada com sucesso !');
    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {

  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
