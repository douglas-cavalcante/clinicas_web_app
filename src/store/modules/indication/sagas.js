import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getIndicationsSuccess, indicationFailure } from './actions';
import history from '~/services/history';

export function* saveIndication({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'indications', payload.data);
      toast.success('Indicação cadastrada com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `indications/${id}`, payload.data);
      toast.success('Indicação atualizada com sucesso !');
      history.goBack();
    }
  } catch (error) {
    if (error.response.data && error.response.data.err) {
      toast.error(error.response.data.err.message);
    }

    yield put(indicationFailure());
  }
}

export function* getIndications() {
  try {
    const response = yield call(api.get, `indications`);
    yield put(getIndicationsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(indicationFailure());
  }
}

export default all([
  takeLatest('@indications/GET_INDICATIONS_REQUEST', getIndications),
  takeLatest('@indications/SAVE_INDICATION_REQUEST', saveIndication),
]);
