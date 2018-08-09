import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Status, ID } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  ITransaction,
  loadTransaction,
  selectTransaction, selectTransactionStatus, ITransfer,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';
import EditNormal from './edit/normal';
import EditTransfer from './edit/transfer';

interface IStateProps {
  orgId:       ID;
  status:      Status;
  transaction: ITransaction | null;
}

interface IDispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class EditTransaction extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load, match } = this.props;
    load(orgId, Number(match.params.id));
  }

  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderTransferTab = (orgId: ID, transaction: ITransfer) => (
    <Tab eventKey={ 1 } title="Transfer">
      <EditTransfer orgId={ orgId } transfer={ transaction } />
    </Tab>
  )

  private renderNormalTab = (orgId: ID, transaction: ITransaction) => (
    <Tab eventKey={ 1 } title={ transaction.category.type }>
      <EditNormal
        type={ transaction.category.type }
        orgId={ orgId }
        transaction={ transaction }
      />
    </Tab>
  )

  private renderTab = (orgId: ID, transaction: ITransaction) => {
    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(orgId, transaction);
    }

    return this.renderNormalTab(orgId, transaction);
  }

  private renderContent = () => {
    const { orgId, transaction } = this.props;
    if (!transaction) { return null; }

    return (
      <Tabs defaultActiveKey={ 1 } id="transactionType">
        { this.renderTab(orgId, transaction) }
      </Tabs>
    );
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match } = prevProps;
    const { status, transaction } = this.props;
    if (status === Status.Invalid || (transaction && transaction.id !== Number(match.params.id))) {
      this.loadData();
    }
  }

  public render() {
    const { status } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoadingView status={ status }>
            { this.renderContent }
          </LoadingView>
          <Clearfix />
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
