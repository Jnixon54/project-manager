const axios = require('axios');

const initialState = {
  projects: [],
  assignedTasks: [],
  loading: false,
  newProjectTitle: '',
  teamProjects: []
};

// Action Types
const GET_PROJECTS = 'GET_PROJECTS';
const GET_USER_ASSIGNED_TASKS = 'GET_USER_ASSIGNED_TASKS';
const UPDATE_NEWPROJECTTITLE = 'UPDATE_NEWPROJECTTITLE';
const GET_TEAM_PROJECTS = 'GET_TEAM_PROJECTS'
const COMPLETED_TASK = 'COMPLETED_TASK'
const UNDO_COMPLETED_TASK = 'UNDO_COMPLETED_TASK'

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_PROJECTS + '_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        projects: action.payload
      });
      case GET_TEAM_PROJECTS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_TEAM_PROJECTS + '_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        teamProjects: action.payload
      });

    case GET_USER_ASSIGNED_TASKS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_USER_ASSIGNED_TASKS + '_FULFILLED':
    console.log(action.payload, "Here are your returned tasks");
      return Object.assign({}, state, {
        loading: false,
        assignedTasks: action.payload
      });
    //Adds project title to database from create new project
    case UPDATE_NEWPROJECTTITLE:
      return Object.assign({}, state, {
        newProjectTitle: action.payload
      });
    default:
      return state;
  }
}

// Action Creators

export function getAllProjects(userID) {
  return {
    type: GET_PROJECTS,
    payload: axios
      .get('/api/allProjects')
      .then(response => response.data)
  };
}

export function getTeamProjects(userID) {
  return {
    type: GET_TEAM_PROJECTS,
    payload: axios
      .get('/api/allTeamProjects')
      .then(response => response.data)
  };
}

export function getAllTasks(userID) {
  return {
    type: GET_USER_ASSIGNED_TASKS,
    payload: axios
      .get('/api/allTasks')
      .then(response => response.data)
  };
}

export function updateNewProjectTitle(e) {
  return {
    type: UPDATE_NEWPROJECTTITLE,
    payload: e.target.value
  };
}

export function completedTask(taskID) {
  console.log(taskID, "In reducer");
  return {
    type: COMPLETED_TASK,
    payload: axios.put(`/api/completedTask/${taskID}`).then(resp => resp)
  }
}
export function undoCompletedTask(taskID) {
  console.log(taskID, "In reducer");
  return {
    type: UNDO_COMPLETED_TASK,
    payload: axios.put(`/api/undoCompletedTask/${taskID}`).then(resp => resp)
  }
}