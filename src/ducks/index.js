import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import projectViewReducer from './reducers/projectViewReducer';
import dashboardReducer from './reducers/dashboardReducer';

// combine Reducers
export default combineReducers({
  user: userReducer,
  projectView: projectViewReducer,
  dashboard: dashboardReducer
});
