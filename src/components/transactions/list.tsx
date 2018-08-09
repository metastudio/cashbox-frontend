import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import * as QS from 'query-string';

import { Status, IPagination } from 'model-types';
import {
  ITransaction,
  loadTransactions,
  selectTransactions, selectTransactionsStatus, selectTransactionsPagination,
} from 'services/transactions';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';
import Paginator from 'components/utils/paginator';
import TransactionsFilter from './filter';

interface IState {
  isFilterOpened: boolean;
}

interface IStateProps {
  orgId:        number;
  status:       Status;
  transactions: ITransaction[];
  pagination:   IPagination;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class TransactionsList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isFilterOpened: false,
  };

  private loadData = () => {
    const { orgId, load, location: { search } } = this.props;
    load(orgId, QS.parse(search));
  }

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

  private renderTransactions = () => {
    const { transactions, pagination } = this.props;

    return (
      <>
        <Table transactions={ transactions } />
        <Paginator data={ pagination } />
      </>
    );
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { status, location: { search } } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
      this.loadData();
    }
  }

  public render() {
    return (
      <>
        <PageHeader>
          <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction...</Link>
          Transactions&nbsp;{ this.renderToggleFilter() }
        </PageHeader>
        <TransactionsFilter open={ this.state.isFilterOpened } />
        <LoadingView status={ this.props.status }>
          { this.renderTransactions }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadTransactions(orgId, params)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(TransactionsList));
