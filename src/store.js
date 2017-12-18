import {createStore, applyMiddleware} from 'redux';
import reducers from './ducks/index';
import { composeWithDevTools } from "redux-devtools-extension";
// import {socketMiddleware} from './connections';
// import promiseMiddleware from 'redux-promise-middleware';

// redux Middleware for handling socket traffic
// const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(createStore);
// export default createStoreWithMiddleware(reducers);

const createStoreWithMiddleware = applyMiddleware(composeWithDevTools)(createStore)
export default createStoreWithMiddleware(reducers);