import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import store from 'store';

import AppRoot from 'components/app';

import './App.css';

const App = () => (
  <IntlProvider locale={ navigator.language }>
    <Provider store={ store }>
      <AppRoot />
    </Provider>
  </IntlProvider>
);

export default App;
