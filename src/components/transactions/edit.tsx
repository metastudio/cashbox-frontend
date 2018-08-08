import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  ITransaction,
  loadTransaction,
  selectTransaction, selectTransactionStatus,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';
import EditIncomeTransaction from './edit/income.jsx';
import EditExpenseTransaction from './edit/expense.jsx';
import EditTransfer from './edit/transfer.jsx';

interface IStateProps {
  orgId:       number;
  status:      Status;
  transaction: ITransaction | null;
}

interface IDispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class EditTransaction extends React.Component<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private loadData(props: IProps) {
    const { orgId, load, match } = props;
    load(orgId, Number(match.params.id));
  }

  private renderTab(transaction: ITransaction) {
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

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match } = prevProps;
    const { status, transaction } = this.props;
    if (status === Status.Invalid || (transaction && transaction.id !== Number(match.params.id))) {
      this.loadData(this.props);
    }
  }

  public render() {
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
  orgId:       selectCurrentOrganizationId(state),
  status:      selectTransactionStatus(state),
  transaction: selectTransaction(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number, transactionId: number) => dispatch(loadTransaction(orgId, transactionId)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditTransaction));
