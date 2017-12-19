import { createStore, applyMiddleware } from 'redux';
import reducers from './ducks/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import store from './store';
// import {socketMiddleware} from './connections'; // Custom middle ware for socket commands

// redux Middleware for handling socket traffic
// const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(createStore);
// export default createStoreWithMiddleware(reducers);

// const createStoreWithMiddleware = applyMiddleware(composeWithDevTools)(createStore);
// export default createStoreWithMiddleware(reducers);

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(applyMiddleware())
);
export default createStoreWithMiddleware;
