import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import company from './company/reducer';
import openingHours from './openingHours/reducer';

import partnership from './partnership/reducer';
import procedure from './procedure/reducer';
import procedureProfessional from './procedureProfessional/reducer';

import room from './room/reducer';

import professional from './professional/reducer';
import professionalSchedule from './professionalSchedule/reducer';

import schedule from './schedule/reducer';

import indication from './indication/reducer';
import patient from './patient/reducer';

import account from './financial/account/reducer';

import financials from './financial/financials/reducer';

export default combineReducers({
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
});
