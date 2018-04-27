import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import * as statuses from 'constants/statuses.js';
import { Transaction } from 'model-types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { loadTransaction } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransaction, selectTransactionStatus } from 'selectors/transactions.js';
import LoadingView from 'components/utils/loading-view';
import EditIncomeTransaction from './edit/income.jsx';
import EditExpenseTransaction from './edit/expense.jsx';
import EditTransfer from './edit/transfer.jsx';

interface StateProps {
  orgId:       number;
  status:      string;
  transaction: Transaction | null;
}

interface DispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = RouteProps & StateProps & DispatchProps;

class EditTransaction extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.history.push('/transactions');
  }

  loadData(props: Props) {
    const { orgId, load, match } = this.props;
    load(orgId, Number(match.params.id));
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { status, match } = nextProps;
    const { transaction } = this.props;
    if (status === statuses.INVALID || !transaction || transaction.id !== Number(match.params.id)) {
      this.loadData(nextProps);
    }
  }

  renderTab(transaction: Transaction) {
    if (transaction.category && transaction.category.name === 'Transfer') {
      return (
        <Tab eventKey={ 1 } title="Transfer"> 
          <EditTransfer />
        </Tab>
      );
    }
    if (Number(transaction.amount.fractional) > 0) {
      return (
        <Tab eventKey={ 1 } title="Income">
          <EditIncomeTransaction />
        </Tab>
      );
    } else {
      return (
        <Tab eventKey={ 1 } title="Expense">
          <EditExpenseTransaction />
        </Tab>
      );
    }
  }
  
  render() {
    const { status, transaction } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={ 1 } id="transactionType">
            <LoadingView status={ this.props.status } />
            { status === statuses.SUCCESS && transaction && this.renderTab(transaction) }
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:       getCurrentOrganizationId(state),
  status:      selectTransactionStatus(state),
  transaction: selectTransaction(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, transactionId: number) => dispatch(loadTransaction(orgId, transactionId)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditTransaction));
