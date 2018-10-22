import * as React from 'react';

import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';

import * as routes from 'routes';
import { selectIsSessionLoaded } from 'services/app/selectors';
import { restoreSession } from 'services/auth';
import { IGlobalState } from 'services/global-state';

import Spinner from 'components/utils/spinner';

import BankAccountsScene  from 'components/bank-accounts';
import CategoriesScene    from 'components/categories';
import CustomersScene     from 'components/customers';
import InvoicesScene      from 'components/invoices';
import LoginScene         from 'components/login';
import MembersScene       from 'components/members';
import OrganizationsScene from 'components/organizations';
import StatisticsScene    from 'components/statistics';
import TransactionsScene  from 'components/transactions';
import UserScene          from 'components/user';

interface IStateProps {
  isLoaded: boolean;
}

interface IDisaptchProps {
  restoreSession: typeof restoreSession.request;
}

type IProps = IStateProps & IDisaptchProps;

class App extends React.PureComponent<IProps> {
  public componentDidMount() {
    this.props.restoreSession();
  }

  public render() {
    if (!this.props.isLoaded) {
      return <Spinner />;
    }

    return (
      <BrowserRouter>
        <BreadcrumbsProvider>
          <div>
            <Switch>
              <Route exact path={ String(routes.rootPath) } component={ TransactionsScene } />
              <Route path="/categories" component={ CategoriesScene } />
              <Route path="/customers" component={ CustomersScene } />
              <Route path="/bank_accounts" component={ BankAccountsScene } />
              <Route path="/invoices" component={ InvoicesScene }/>
              <Route path="/login" component={ LoginScene } />
              <Route path="/members" component={ MembersScene } />
              <Route path="/organizations" component={ OrganizationsScene } />
              <Route path={ String(routes.statisticsPath) } component={ StatisticsScene } />
              <Route path="/transactions" component={ TransactionsScene } />
              <Route path="/user" component={ UserScene }/>
            </Switch>
          </div>
        </BreadcrumbsProvider>
      </BrowserRouter>
    );
  }
}

const mapSelect = (state: IGlobalState): IStateProps => ({
  isLoaded: selectIsSessionLoaded(state),
});

const mapDispatch = (dispatch: Dispatch): IDisaptchProps => ({
  restoreSession: () => dispatch(restoreSession.request()),
});

export default connect<IStateProps, IDisaptchProps>(mapSelect, mapDispatch)(App);
