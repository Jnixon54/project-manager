
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import * as projectViewActions from '../../ducks/reducers/projectViewReducer';
import io from 'socket.io-client';
import store from '../../store';

const PORT = 3001;

const socket = io.connect(`${location.protocol}//${location.hostname}:${PORT}`);

// OUTBOUND SOCKET EVENTS (Front-end -> Server)
export function socketMiddleware(store) {
  return next => action => {
    const state = store.getState();
    console.log('Socket Middleware State: ', state);
    if (socket && action.type === 'INCREASE_COUNT_SOCKET') {
      socket.emit('increase_count', { count: state.projectView.count })
    }
    if (socket && action.type === 'JOIN_ROOM_SOCKET') {
      socket.join(action.payload);
    }
    return next(action);
  }
}

// INBOUND SOCKET EVENTS (Server -> Front-End)
export default function(store) {
  socket.on('update_client', (data) => {
    console.log('INBOUND COUNT', data.count)
    store.dispatch(projectViewActions.increaseCount(data))
  })
}
