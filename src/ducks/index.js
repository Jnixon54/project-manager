import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import projectViewReducer from './reducers/projectViewReducer';
import dashboardReducer from './reducers/dashboardReducer';
import cardReducer from './reducers/cardReducer'
import settingReducer from './reducers/settingReducer'

// combine Reducers
export default combineReducers({
  user: userReducer,
  projectView: projectViewReducer,
  dashboard: dashboardReducer,
  cardReducer: cardReducer,
  settingReducer: settingReducer
});
