const axios = require('axios');

const initialState = {
  projects: [],
  assignedTasks: [],
  loading: false,
  newProjectTitle: '',
  teamProjects: [],
  changed: 0
};

// Action Types
const GET_PROJECTS = 'GET_PROJECTS';
const GET_USER_ASSIGNED_TASKS = 'GET_USER_ASSIGNED_TASKS';
const UPDATE_NEWPROJECTTITLE = 'UPDATE_NEWPROJECTTITLE';
const GET_TEAM_PROJECTS = 'GET_TEAM_PROJECTS'
const COMPLETED_TASK = 'COMPLETED_TASK'
const UNDO_COMPLETED_TASK = 'UNDO_COMPLETED_TASK'
const RESET_PROJECT_VALUE = 'RESET_PROJECT_VALUE'

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
  
    let sortedTasksArray = []
      let sortedAssignedTasks = { title: "", tasks: [] }
      let tasksObject = {id: 0, content: "", completed: false}
      console.log(action.payload, "Here is your payload");
   
  function sortArray(){
    for (let item = 0; item < action.payload.length; item++){
      if (sortedTasksArray.length === 0){
      
        sortedAssignedTasks.title = action.payload[item].title
        tasksObject.id=action.payload[item].task_id
        tasksObject.content=action.payload[item].content
        tasksObject.completed=action.payload[item].completed
        sortedAssignedTasks.tasks.push(tasksObject)
        sortedTasksArray.push(sortedAssignedTasks)
        
      } else if(sortedTasksArray.findIndex(currItem => currItem.title === action.payload[item].title) >= 0){
        tasksObject.id=action.payload[item].task_id
        tasksObject.content=action.payload[item].content
        tasksObject.completed=action.payload[item].completed
        sortedTasksArray[sortedTasksArray.findIndex(currItem => currItem.title === action.payload[item].title)].tasks.push(tasksObject)
      } else{
        sortedAssignedTasks.title = action.payload[item].title
        tasksObject.id=action.payload[item].task_id
        tasksObject.content=action.payload[item].content
        tasksObject.completed=action.payload[item].completed
        sortedAssignedTasks.tasks.push(tasksObject)
        sortedTasksArray.push(sortedAssignedTasks)
      }
      sortedAssignedTasks = { title: "", tasks: []}
      tasksObject = {id: "", content: "", completed: false}
    }
    return sortedTasksArray
  }
    sortArray()
      return Object.assign({}, state, {
        loading: false,
        assignedTasks: sortedTasksArray
      });
    //Adds project title to database from create new project
    case UPDATE_NEWPROJECTTITLE:
      return Object.assign({}, state, {
        newProjectTitle: action.payload
      });
    case RESET_PROJECT_VALUE:
      return Object.assign({}, state, {
        newProjectTitle: ""
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
export function resetProjectValue() {
  return {
    type: RESET_PROJECT_VALUE
  }
}