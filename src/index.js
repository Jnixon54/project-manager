import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStoreWithMiddleware from './store';
// import registerServiceWorker from './registerServiceWorker';
// import startConnection from './utils/sockets/connections';

// startConnection(createStoreWithMiddleware);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
// registerServiceWorker();
