import { combineReducers } from 'redux';
import userReducer from './userReducer';
import projectVReducer from './projectVReducer';

// combine Reducers
export default combineReducers({
  user: userReducer,
  projectV: projectVReducer
});
