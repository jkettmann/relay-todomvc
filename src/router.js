import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import 'isomorphic-fetch';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, Store } from 'relay-runtime';

import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';

export const historyMiddlewares = [queryMiddleware];

function createFetch(url) {
  return async function fetchQuery(operation, variables) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: operation.text, variables }),
    });

    return response.json();
  };
}

export function createResolver(url, recordSource) {
  const environment = new Environment({
    network: Network.create(createFetch(url)),
    store: new Store(recordSource),
  });

  return new Resolver(environment);
}

const TodoListQuery = graphql`
  query router_TodoList_Query($status: String!) {
    viewer {
      ...TodoList_viewer
    }
  }
`;

export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    Component={TodoApp}
    query={graphql`
      query router_TodoApp_Query {
        viewer {
          ...TodoApp_viewer
        }
      }
    `}
  >
    <Route
      Component={TodoList}
      query={TodoListQuery}
      prepareVariables={params => ({ ...params, status: 'any' })}
    />
    <Route
      path=":status"
      Component={TodoList}
      query={TodoListQuery}
    />
  </Route>,
);

export const render = createRender({});
