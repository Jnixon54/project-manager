import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  // provider will make sure any of my commponents that is wrap inside of provider has what it needs.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
