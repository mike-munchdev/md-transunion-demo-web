import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

console.log(
  'process.env.REACT_APP_GRAPHQL_URL',
  process.env.REACT_APP_GRAPHQL_URL
);
console.log(
  'process.env.REACT_APP_HTTP_PROTOCOL',
  process.env.REACT_APP_HTTP_PROTOCOL
);
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
