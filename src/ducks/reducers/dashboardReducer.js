const axios = require('axios');

const initialState = {
  projects: [],
  tasks: [],
  loading: false
};

// Action Types
const GET_PROJECTS = 'GET_PROJECTS';
const GET_TASKS = 'GET_TASKS';

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_PROJECTS + '_FULFILLED':
      console.log(action.payload);
      return Object.assign({}, state, {
        loading: false,
        projects: action.payload
      });

    case GET_TASKS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_TASKS + '_FULFILLED':
      console.log(action.payload);
      return Object.assign({}, state, {
        loading: false,
        tasks: action.payload
      });
    default:
      return state;
  }
}

// Action Creators

export function getAllProjects() {
  return {
    type: GET_PROJECTS,
    payload: axios
      .post('http://localhost:3001/api/allProjects', { id: 1 })
      .then(response => response.data)
  };
}

export function getAllTasks() {
  return {
    type: GET_TASKS,
    payload: axios
      .post('http://localhost:3001/api/allTasks', { id: 1 })
      .then(response => response.data)
  };
}
