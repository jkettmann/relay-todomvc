import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecordSource } from 'relay-runtime';

import { createResolver, historyMiddlewares, render, routeConfig }
  from './router';

import 'todomvc-common/base';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import './assets/learn.json';

(async () => {
  // eslint-disable-next-line no-underscore-dangle
  const recordSource = new RecordSource(window.__RELAY_RECORDS__);
  const resolver = createResolver('/graphql', recordSource);

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  ReactDOM.render(
    <Router resolver={resolver} />,
    document.getElementById('root'),
  );
})();
