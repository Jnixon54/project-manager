import { createStore, applyMiddleware } from 'redux';
import reducers from './ducks/index';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import store from './store';
// import {socketMiddleware} from './utils/sockets/connections'; // Custom middleware for socket commands

// redux Middleware for handling socket traffic
// const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(createStore);
// export default createStoreWithMiddleware(reducers);

// const createStoreWithMiddleware = applyMiddleware(composeWithDevTools)(createStore);
// export default createStoreWithMiddleware(reducers);

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);
export default createStoreWithMiddleware;
