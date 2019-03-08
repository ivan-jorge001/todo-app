import { combineReducers } from 'redux';
import sharedReducers from '../reducers';

export default combineReducers({
  ...sharedReducers,
})