import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'store';

import AppRoot from 'components/app';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <AppRoot />
  </Provider>
);

export default App;
