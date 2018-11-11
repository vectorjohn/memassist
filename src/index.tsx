import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import * as reducers from './reducers'

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(combineReducers(reducers))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
