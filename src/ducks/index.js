import { combineReducers } from 'redux';
import userReducer from './userReducer';


// combine Reducers
export default combineReducers({
  user: userReducer
})