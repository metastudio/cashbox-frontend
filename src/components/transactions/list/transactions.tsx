import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { Transaction } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadTransactions } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransactions, selectTransactionsStatus } from 'selectors/transactions.js';

import LoadingView from 'components/utils/loading-view';
import TableBody from './table-body';
import EditTransaction from './../edit';

interface StateProps {
  orgId:        number;
  status:       string;
  transactions: Transaction[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class Transactions extends React.Component<Props> {

  loadData(props: Props) {
    const { orgId, load } = this.props;
    load(orgId);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.status === statuses.INVALID) {
      this.loadData(this.props);
    }
  }

  render() {
    const { status, transactions } = this.props;

    if (status !== statuses.SUCCESS || !transactions) {
      return <LoadingView status={ status } />;
    }
    return (
      <>
        <Table striped responsive hover id="transactions">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Account</th>
              <th>Customer</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <TableBody transactions={ transactions } />
        </Table>
        <EditTransaction />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:         getCurrentOrganizationId(state),
  status:        selectTransactionsStatus(state),
  transactions:  selectTransactions(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadTransactions(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Transactions);
