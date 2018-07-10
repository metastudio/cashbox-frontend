import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Modal, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Status, Transaction } from 'model-types';
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
  handleClose = () => {
    this.props.history.push('/transactions');
  }

  loadData(props: Props) {
    const { orgId, load, match } = props;
    load(orgId, Number(match.params.id));
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    const { match } = prevProps;
    const { status, transaction } = this.props;
    if (status === Status.Invalid || (transaction && transaction.id !== Number(match.params.id))) {
      this.loadData(this.props);
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
          <Row>
            <Col xs={ 12 }>
              <LoadingView status={ status }>
                <Tabs defaultActiveKey={ 1 } id="transactionType">
                  { status === Status.Success && transaction && this.renderTab(transaction) }
                </Tabs>
              </LoadingView>
            </Col>
          </Row>
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
