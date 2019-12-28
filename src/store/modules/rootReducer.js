import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import company from './company/reducer';
import openingHours from './openingHours/reducer';

import partnership from './partnership/reducer';
import procedure from './procedure/reducer';

export default combineReducers({
  auth,
  user,
  company,
  openingHours,
  partnership,
  procedure,
});
