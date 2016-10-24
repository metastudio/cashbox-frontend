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
import createSagaMiddleware from 'redux-saga'

import * as reducers from 'reducers'

import 'font-awesome-loader'
import './index.scss'

import App from 'components/app'
import LoginScene from 'components/login'
import DashboardScene from 'components/dashboard'
import OrganizationsScene from 'components/organizations'
import Transactions from 'components/transactions'
import MembersScene from 'components/members'
import BankAccountsScene from 'components/bank-accounts'
import CategoriesScene from 'components/categories'
import CustomersScene from 'components/customers'

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
            <Route path="transactions/new" component={Transactions.New} />
          </Route>
          <Route path="login" component={LoginScene} />
          <Route path="organizations" component={OrganizationsScene} >
            <IndexRedirect to="select" />
            <Route path="select" component={OrganizationsScene.Select} />
            <Route path="new" component={OrganizationsScene.New} />
          </Route>
          <Route path="members" component={MembersScene}>
            <IndexRoute component={MembersScene.Members} />
          </Route>
          <Route path="bank_accounts" component={BankAccountsScene}>
            <IndexRoute component={BankAccountsScene.BankAccounts} />
            <Route path="new" component={BankAccountsScene.New} />
            <Route path=":bankAccountId/edit" component={BankAccountsScene.Edit} />
          </Route>
          <Route path="categories" component={CategoriesScene}>
            <IndexRoute component={CategoriesScene.Categories} />
            <Route path="new" component={CategoriesScene.New} />
            <Route path=":categoryId/edit" component={CategoriesScene.Edit} />
          </Route>
          <Route path="customers" component={CustomersScene}>
            <IndexRoute component={CustomersScene.Customers} />
            <Route path="new" component={CustomersScene.New} />
            <Route path=":customerId/edit" component={CustomersScene.Edit} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </IntlProvider>
), document.getElementById('root'))
