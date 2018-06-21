import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import { Transaction } from 'model-types';
import * as QS from 'query-string';
import * as statuses from 'constants/statuses.js';
import { loadTransactions } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransactions, selectTransactionsStatus } from 'selectors/transactions.js';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';
import TransactionsFilter from './filter';

interface StateProps {
  orgId:          number;
  status:         string;
  transactions:   Transaction[] | null;
}

interface OwnState {
  isFilterOpened: boolean;
}

interface DispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class TransactionsList extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFilterOpened: false
    };
  }

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

    if (status === statuses.INVALID || oldSearch !== nextSearch) {
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
        <PageHeader>
          <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction...</Link>
          Transactions
          <Link to="#" onClick={ () => this.setState({ isFilterOpened: !this.state.isFilterOpened }) } title="Filters">
            <i className="fa fa-filter" />
          </Link>
        </PageHeader>
        <TransactionsFilter isFilterOpened={ this.state.isFilterOpened } />
        <Table transactions={ transactions } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadTransactions(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(TransactionsList));
