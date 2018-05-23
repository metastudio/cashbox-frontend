import * as React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import store from 'store';
import apolloClient from './apollo';

import AppRoot from 'components/app';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <ApolloProvider client={ apolloClient }>
      <AppRoot />
    </ApolloProvider>
  </Provider>
);

export default App;
