import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStoreWithMiddleware from './store'
import * as userReducer from './ducks/reducers/userReducer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, div);
});

