import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import * as reducers from './reducers'

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(reduxLogger, reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
