import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import company from './company/sagas';
import openingHours from './openingHours/sagas';

import partnership from './partnership/sagas';
import procedure from './procedure/sagas';

export default function* rootSaga() {
  return yield all([auth, user, company, openingHours, partnership, procedure]);
}
