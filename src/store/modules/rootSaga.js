import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import company from './company/sagas';
import openingHours from './openingHours/sagas';

import partnership from './partnership/sagas';
import procedure from './procedure/sagas';

import room from './room/sagas';

import professional from './professional/sagas';
import professionalSchedule from './professionalSchedule/sagas';

import procedureProfessional from './procedureProfessional/sagas';

import schedule from './schedule/sagas';

import indication from './indication/sagas';
import patient from './patient/sagas';

// Financeiro

import account from './financial/account/sagas';

import financials from './financial/financials/sagas';
import scheduleReport from './report/schedule/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    user,
    company,
    openingHours,
    partnership,
    procedure,
    procedureProfessional,
    room,
    professional,
    professionalSchedule,
    schedule,
    indication,
    patient,
    // financeiro
    account,
    financials,
    scheduleReport,
  ]);
}
