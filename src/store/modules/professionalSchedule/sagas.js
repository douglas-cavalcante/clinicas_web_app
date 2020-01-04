import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  getProfessionalScheduleSuccess,
  professionalScheduleFailure,
} from './actions';
import history from '~/services/history';

export function* saveProfessionalSchedule({ payload }) {
  try {
    const { id } = payload.data;
    if (!id) {
      yield call(api.post, 'professionalSchedule', payload.data);
      toast.success('Agenda cadastrado com sucesso !');
      history.goBack();
    } else {
      yield call(api.put, `professionalSchedule/${id}`, payload.data);
      toast.success('Agenda atualizado com sucesso !');
      history.goBack();
    }
  } catch (error) {
    toast.error('Houve um erro ao tentar atualizar.');
    yield put(professionalScheduleFailure());
  }
}
export function* getProfessionalSchedule({ payload }) {
  try {
    const response = yield call(
      api.get,
      `professionalSchedule?id=${payload.id}`
    );

    const formatData = response.data.map(item => {
      if (item.day === '1') {
        item.day = 'Segunda-feira';
      } else if (item.day === '2') {
        item.day = 'Terça-feira';
      } else if (item.day === '3') {
        item.day = 'Quarta-feira';
      } else if (item.day === '4') {
        item.day = 'Quinta-feira';
      } else if (item.day === '5') {
        item.day = 'Sexta-feira';
      } else if (item.day === '6') {
        item.day = 'Sábado';
      } else if (item.day === '7') {
        item.day = 'Domingo';
      }
      item.room = item.room.name;
      return item;
    });
    console.log(formatData);
    yield put(getProfessionalScheduleSuccess(formatData));
  } catch (error) {
    toast.error('Houve um erro interno.');
    yield put(professionalScheduleFailure());
  }
}

export default all([
  takeLatest(
    '@professionalSchedule/GET_PROFESSIONAL_SCHEDULE_REQUEST',
    getProfessionalSchedule
  ),
  takeLatest(
    '@professionalSchedule/SAVE_PROFESSIONAL_SCHEDULE_REQUEST',
    saveProfessionalSchedule
  ),
]);
