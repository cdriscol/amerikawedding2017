import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
require('./main.css');

export default function App() {
  return (
    <Router history={browserHistory}>
      {routes}
    </Router>
  );
}
