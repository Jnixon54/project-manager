import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

// combine Reducers
export default combineReducers({
  user: userReducer
});
