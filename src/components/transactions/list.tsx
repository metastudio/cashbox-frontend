import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';

import { Transaction, Pagination as PaginationInterface } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadTransactions } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import {
  selectTransactions,
  selectTransactionsStatus,
  selectTransactionsPagination
} from 'selectors/transactions.js';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';
import Pagination from 'components/pagination';

interface StateProps {
  orgId:        number;
  status:       string;
  transactions: Transaction[] | null;
  pagination:   PaginationInterface;
}

interface DispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class TransactionsList extends React.Component<Props> {
  loadData = (props: Props) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, QS.parse(search));
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { status, location: { search: nextSearch } } = nextProps;
    const { location: { search: oldSearch } } = this.props;

    if (status === statuses.INVALID  || oldSearch !== nextSearch) {
      this.loadData(nextProps);
    }
  }

  render() {
    const { status, transactions } = this.props;

    if (status !== statuses.SUCCESS || !transactions) {
      return <LoadingView status={ status } />;
    }
    return (
      <>
        <Table transactions={ transactions } />
        <Pagination data={ this.props.pagination } newPathname={ '/transactions' } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadTransactions(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(TransactionsList));
