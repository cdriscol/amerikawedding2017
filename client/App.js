import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
require('./main.css');
import ReactGA from 'react-ga';
import config from '../server/config';
ReactGA.initialize(config.gaTrackingId);

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export default function App() {
  return (
    <Router history={browserHistory} onUpdate={logPageView}>
      {routes}
    </Router>
  );
}
