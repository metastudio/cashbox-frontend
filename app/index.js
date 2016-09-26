import React from 'react'
import { IntlProvider } from 'react-intl'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import { apiMiddleware } from 'redux-api-middleware'

import * as reducers from 'reducers'

import 'font-awesome-loader'
import './index.scss'

import App from 'components/app'
import LoginScene from 'components/login'
import DashboardScene from 'components/dashboard'
import NewOrganizationScene from 'components/new-organization'

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer,
  form: formReducer,
})

const logger = createLogger()
const reduxRouterMiddleware = syncHistory(browserHistory)

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
  promiseMiddleware,
  apiMiddleware,
  logger // TODO disable in prod
)(createStore)

const store = createStoreWithMiddleware(reducer)

render((
  <IntlProvider locale={navigator.language}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={DashboardScene} />
          <Route path="login" component={LoginScene} />
          <Route path="organizations/new" component={NewOrganizationScene} />
        </Route>
      </Router>
    </Provider>
  </IntlProvider>
), document.getElementById('root'))
