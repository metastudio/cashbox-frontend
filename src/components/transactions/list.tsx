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
import Pagination from 'components/pagination';
import TransactionsFilter from './filter';

interface IOwnState {
  isFilterOpened: boolean;
}

interface IStateProps {
  orgId:        number;
  status:       Status;
  transactions: ITransaction[] | null;
  pagination:   IPagination;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class TransactionsList extends React.Component<IProps, IOwnState> {
  public state: IOwnState = {
    isFilterOpened: false,
  };

  private loadData = (props: IProps) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, QS.parse(search));
  }

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate(prevProps: IProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { status, location: { search } } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
      this.loadData(this.props);
    }
  }

  public render() {
    const { status, transactions } = this.props;

    if (status !== Status.Success || !transactions) {
      return <LoadingView status={ status } />;
    }
    return (
      <>
        <PageHeader>
          <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction...</Link>
          Transactions
          <Link to="#" onClick={ () => this.setState({ isFilterOpened: !this.state.isFilterOpened }) } title="Filters">
            <i className="fa fa-filter" />
          </Link>
        </PageHeader>
        <TransactionsFilter isFilterOpened={ this.state.isFilterOpened } />
        <Table transactions={ transactions } />
        <Pagination data={ this.props.pagination } newPathname={ '/transactions' } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number, params: object) => dispatch(loadTransactions(orgId, params)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(TransactionsList));
