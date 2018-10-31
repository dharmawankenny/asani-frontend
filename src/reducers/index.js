import { combineReducers } from 'redux';

import creditScore from './creditScore';
import loan from './loan';
import product from './product';
import userDocument from './userDocument';

// TODO: add reducers
export default combineReducers({
  creditScore,
  loan,
  product,
  userDocument,
});
