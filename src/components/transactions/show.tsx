import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ID } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import { ITransaction, ITransfer } from 'services/transactions';

import LoadedTransaction from './loaded-transaction';
import ShowNormal from './show/normal';
import ShowTransfer from './show/transfer';

interface IStateProps {
  orgId: ID;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps;

class ShowTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderTransferTab = (orgId: ID, transaction: ITransfer) => (
    <Tab eventKey={ 1 } title="Transfer">
      <ShowTransfer transfer={ transaction } />
    </Tab>
  )

  private renderNormalTab = (orgId: ID, transaction: ITransaction) => (
    <Tab eventKey={ 1 } title={ transaction.category.type }>
      <ShowNormal transaction={ transaction } />
    </Tab>
  )

  private renderTab = (orgId: ID, transaction: ITransaction) => {
    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(orgId, transaction);
    }

    return this.renderNormalTab(orgId, transaction);
  }

  private renderContent = (transaction: ITransaction) => {
    const { orgId } = this.props;

    return (
      <Tabs defaultActiveKey={ 1 } id="transactionType">
        { this.renderTab(orgId, transaction) }
      </Tabs>
    );
  }

  public render() {
    const { orgId, match: { params } } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoadedTransaction orgId={ orgId } transactionId={ Number(params.id) }>
            { this.renderContent }
          </LoadedTransaction>
          <Clearfix />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId: selectCurrentOrganizationId(state),
});

export default withRouter(connect<IStateProps>(mapState)(ShowTransaction));
