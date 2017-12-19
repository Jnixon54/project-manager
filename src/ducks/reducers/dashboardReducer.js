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
  console.log('Reducer fired');
  console.log('State:', state);
  console.log('Action:', action);

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
  }
}

// Action Creators

export function getAllProjects() {
  return {
    type: GET_PROJECTS,
    payload: axios
      .get('/api/allProjects')
      .then(response => console.log(response))
  };
}

export function getAllTasks() {
  return {
    type: GET_TASKS,
    payload: axios.get('/api/allTasks').then(response => console.log(response))
  };
}
