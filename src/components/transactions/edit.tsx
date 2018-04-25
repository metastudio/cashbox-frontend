import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import * as statuses from 'constants/statuses.js';
import { Transaction } from 'model-types';
import { loadTransaction } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransaction, selectTransactionStatus } from 'selectors/transactions.js';
import EditIncomeTransaction from './edit/income.jsx';
import EditExpenseTransaction from './edit/expense.jsx';
import EditTransfer from './edit/transfer.jsx';

interface State {
  show: boolean;
}

interface StateProps {
  orgId:       number;
  status:      string;
  transaction: Transaction | null;
}

interface DispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type Props = StateProps & DispatchProps;

class EditTransaction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  componentWillReceiveProps(nextProps: Props) {
    const { transaction } = nextProps;
    this.setState({ show: !!transaction });
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

    if (status !== statuses.SUCCESS || !transaction) {
      return null;
    }

    return(
      <Modal show={ this.state.show } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={ 1 } id="transactionType">
            { this.renderTab(transaction) }
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

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditTransaction);
