import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getRoomsSuccess, roomsFailure } from './actions';
import history from '~/services/history';

export function* saveRoom({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'rooms', payload.data);
      toast.success('Sala cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `rooms/${id}`, payload.data);
      toast.success('Sala atualizado com sucesso !');
      history.goBack();
    }
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(roomsFailure());
  }
}

export function* getRooms({ payload }) {
  try {
    const response = yield call(api.get, `rooms?id=${payload.id}`);
    yield put(getRoomsSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(roomsFailure());
  }
}

export default all([
  takeLatest('@rooms/GET_ROOMS_REQUEST', getRooms),
  takeLatest('@rooms/SAVE_ROOM_REQUEST', saveRoom),
]);
