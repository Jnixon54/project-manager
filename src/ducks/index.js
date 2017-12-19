import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import projectViewReducer from './reducers/projectViewReducer';

// combine Reducers
export default combineReducers({
  user: userReducer,
  projectView: projectViewReducer
});
