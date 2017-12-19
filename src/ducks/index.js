import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import dashboardReducer from './reducers/dashboardReducer';

// combine Reducers
export default combineReducers({
  user: userReducer,
  dashboard: dashboardReducer
});
