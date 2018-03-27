import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import { restoreSession } from 'actions/auth.js';

import Spinner from 'components/utils/spinner';

import LoginScene         from 'components/login';
import DashboardScene     from 'components/dashboard';
import TransactionsScene  from 'components/transactions';
import OrganizationsScene from 'components/organizations';
// import MembersScene       from 'components/members';
// import BankAccountsScene  from 'components/bank-accounts';
import CategoriesScene    from 'components/categories';
import CustomersScene     from 'components/customers';
// import UserScene          from 'components/user';

/* <Router history={ browserHistory} >
<Route path="/" component={ App }>
  <Route path="login" component={ LoginScene } />
  <Route path="members" component={ MembersScene }>
    <IndexRoute component={ MembersScene.Members } />
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
  <Route path="user" component={UserScene}>
    <IndexRedirect to="profile" />
    <Route path="profile" component={UserScene.Profile} />
  </Route>
</Route>
</Router> */

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
          <div>
            <Route exact path="/" component={ DashboardScene } />
            <Route path="/transactions" component={ TransactionsScene } />
            <Route path="/login" component={ LoginScene } />
            <Route path="/organizations" component={ OrganizationsScene } />
            <Route path="/customers" component={ CustomersScene } />
            <Route path="/categories" component={ CategoriesScene } />
          </div>
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
  isSessionLoaded: state.app.isSessionLoaded
});

const dispatches = (dispatch) => ({
  restoreSession: () => dispatch(restoreSession()),
});

export default connect(select, dispatches)(App);
