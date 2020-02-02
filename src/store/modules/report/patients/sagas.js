import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getPatientReportSuccess } from './actions';

export function* getPatientReport({ payload }) {
  try {
    const response = yield call(api.post, `patientsReport`, {
      ...payload.data,
    });

    yield put(getPatientReportSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
  }
}

export default all([
  takeLatest('@patient_report/GET_PATIENTS_REPORT_REQUEST', getPatientReport),
]);
