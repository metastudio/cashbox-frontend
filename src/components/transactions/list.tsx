import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { IPagination } from 'model-types';
import { ITransaction } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import TransactionsProvider from './providers/transactions';
import Table from './list/table';
import Paginator from 'components/utils/paginator';
import TransactionsFilter from './filter';

interface IState {
  isFilterOpened: boolean;
}

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class TransactionsList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isFilterOpened: false,
  };

  private handleToggleFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ isFilterOpened: !this.state.isFilterOpened });
  }

  private renderToggleFilter = () => (
    <small>
      <a href="#" onClick={ this.handleToggleFilter } title="Filter">
        <i className="fa fa-filter" />
      </a>
    </small>
  )

  private renderTransactions = (transactions: ITransaction[], pagination: IPagination) => (
    <>
      <Table transactions={ transactions } />
      <Paginator data={ pagination } />
    </>
  )

  public render() {
    const { orgId, location: { search } } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction...</Link>
          Transactions&nbsp;{ this.renderToggleFilter() }
        </PageHeader>
        <TransactionsFilter open={ this.state.isFilterOpened } />
        <TransactionsProvider orgId={ orgId } search={ search }>
          { this.renderTransactions }
        </TransactionsProvider>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId(TransactionsList));
