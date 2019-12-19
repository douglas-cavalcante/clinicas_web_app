import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import company from './company/reducer';
import openingHours from './openingHours/reducer';

export default combineReducers({
  auth,
  user,
  company,
  openingHours,
});
