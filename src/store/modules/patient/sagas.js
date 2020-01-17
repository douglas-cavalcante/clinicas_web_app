import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import history from '~/services/history';
import {
  patientFailure,
  getPatientsSuccess,
  getPatientsOptionsSuccess,
  getPatientsOptionsRequest,
} from './actions';

export function* savePatient({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'patients', payload.data);
      toast.success('Paciente cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `patients/${id}`, payload.data);
      toast.success('Paciente atualizado com sucesso !');

      history.goBack();
    }
  } catch (error) {
    if (error.response.data && error.response.data.err) {
      toast.error(error.response.data && error.response.data.err.message);
    }
    yield put(patientFailure());
  }
}

export function* savePrePatient({ payload }) {
  try {
    yield call(api.post, 'patients', payload.data);
    toast.success('Paciente cadastrado com sucesso !');
    yield put(getPatientsOptionsRequest());
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(patientFailure());
  }
}

export function* getPatients() {
  try {
    const response = yield call(api.get, `patients`);
    yield put(getPatientsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(patientFailure());
  }
}

export function* getPatientsOptions() {
  try {
    const response = yield call(api.get, `professionals/options`);
    yield put(getPatientsOptionsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(patientFailure());
  }
}

export default all([
  takeLatest('@patient/GET_PATIENTS_REQUEST', getPatients),
  takeLatest('@patient/SAVE_PATIENT_REQUEST', savePatient),
  takeLatest('@patient/SAVE_PRE_PATIENT_REQUEST', savePrePatient),
  takeLatest('@patient/GET_PATIENTS_OPTIONS_REQUEST', getPatientsOptions),
]);
