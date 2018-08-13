import * as React from 'react';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ID } from 'model-types';
import { ITransaction, ITransfer } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import LoadedTransaction from './loaded-transaction';
import EditNormal from './edit/normal';
import EditTransfer from './edit/transfer';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class EditTransaction extends React.PureComponent<IProps> {
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
          <Modal.Title>Edit Transaction</Modal.Title>
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

export default withRouter(withCurrentOrgId(EditTransaction));
