import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Moment from 'moment';
import 'moment/locale/ru';

import App from 'App';
import registerServiceWorker from 'registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
// tslint:disable-next-line:ordered-imports Theme should be include after bootstrap
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

// TODO: we need to implement a choice of locale and store it in users profile
Moment.locale('ru');

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
