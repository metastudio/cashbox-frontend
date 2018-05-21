import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { Transaction } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadTransactions } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransactions, selectTransactionsStatus } from 'selectors/transactions.js';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';

interface StateProps {
  orgId:        number;
  status:       string;
  transactions: Transaction[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class TransactionsList extends React.Component<Props> {
  loadData = (props: Props) => {
    const { orgId, load } = this.props;
    load(orgId);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    if (props.status === statuses.INVALID) {
      this.loadData(this.props);
    }
  }

  render() {
    const { status, transactions } = this.props;

    if (status !== statuses.SUCCESS || !transactions) {
      return <LoadingView status={ status } />;
    }
    return (
      <Table transactions={ transactions } />
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadTransactions(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(TransactionsList);
