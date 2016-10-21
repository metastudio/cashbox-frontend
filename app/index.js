import 'babel-polyfill'

import React from 'react'
import { IntlProvider } from 'react-intl'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import { apiMiddleware } from 'redux-api-middleware'
import createSagaMiddleware from 'redux-saga'

import * as reducers from 'reducers'

import 'font-awesome-loader'
import './index.scss'

import App from 'components/app'
import LoginScene from 'components/login'
import DashboardScene from 'components/dashboard'
import OrganizationsScene from 'components/organizations'
import Transactions from 'components/transactions'

import rootSaga from 'sagas'

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer,
  form: formReducer,
})

const logger = createLogger()
const reduxRouterMiddleware = syncHistory(browserHistory)
const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
  promiseMiddleware,
  apiMiddleware,
  sagaMiddleware,
  logger // TODO disable in prod
)(createStore)

const store = createStoreWithMiddleware(reducer)

sagaMiddleware.run(rootSaga)

render((
  <IntlProvider locale={navigator.language}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route component={DashboardScene}>
            <IndexRoute component={Transactions} />
            <Route path="transactions/new" component={Transactions.NewTransaction} />
          </Route>
          <Route path="login" component={LoginScene} />
          <Route path="organizations" component={OrganizationsScene} >
            <IndexRedirect to="select" />
            <Route path="select" component={OrganizationsScene.Select} />
            <Route path="new" component={OrganizationsScene.New} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </IntlProvider>
), document.getElementById('root'))
