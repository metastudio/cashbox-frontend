import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import { restoreSession } from 'services/auth';

import Spinner from 'components/utils/spinner';

import LoginScene         from 'components/login';
import TransactionsScene  from 'components/transactions';
import OrganizationsScene from 'components/organizations';
import MembersScene       from 'components/members';
import BankAccountsScene  from 'components/bank-accounts';
import CategoriesScene    from 'components/categories';
import CustomersScene     from 'components/customers';
import UserScene          from 'components/user';
import InvoicesScene      from 'components/invoices';

class App extends React.Component {
  componentDidMount() {
    this.props.restoreSession();
  }

  render() {
    if (!this.props.isSessionLoaded) {
      return <Spinner />;
    } else {
      return (
        <BrowserRouter>
          <BreadcrumbsProvider>
            <div>
              <Switch>
                <Route exact path="/" component={ TransactionsScene } />
                <Route path="/transactions" component={ TransactionsScene } />
                <Route path="/login" component={ LoginScene } />
                <Route path="/organizations" component={ OrganizationsScene } />
                <Route path="/customers" component={ CustomersScene } />
                <Route path="/categories" component={ CategoriesScene } />
                <Route path="/bank_accounts" component={BankAccountsScene} />
                <Route path="/members" component={ MembersScene } />
                <Route path="/user" component={ UserScene }/>
                <Route path="/invoices" component={ InvoicesScene }/>
              </Switch>
            </div>
          </BreadcrumbsProvider>
        </BrowserRouter>
      );
    }
  }
}

App.propTypes = {
  isSessionLoaded: PropTypes.bool.isRequired,
  restoreSession:  PropTypes.func.isRequired,
};

const select = (state) => ({
  isSessionLoaded: state.app.isSessionLoaded,
});

const dispatches = (dispatch) => ({
  restoreSession: () => dispatch(restoreSession()),
});

export default connect(select, dispatches)(App);
