import * as React from 'react';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ITransaction, ITransfer } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import LoadedTransaction from './loaded-transaction';
import ShowNormal from './show/normal';
import ShowTransfer from './show/transfer';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class ShowTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderTransferTab = (transaction: ITransfer) => (
    <Tab eventKey={ 1 } title="Transfer">
      <ShowTransfer transfer={ transaction } />
    </Tab>
  )

  private renderNormalTab = (transaction: ITransaction) => (
    <Tab eventKey={ 1 } title={ transaction.category.type }>
      <ShowNormal transaction={ transaction } />
    </Tab>
  )

  private renderTab = (transaction: ITransaction) => {
    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(transaction);
    }

    return this.renderNormalTab(transaction);
  }

  private renderContent = (transaction: ITransaction) => {
    return (
      <Tabs defaultActiveKey={ 1 } id="transactionType">
        { this.renderTab(transaction) }
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

export default withRouter(withCurrentOrgId(ShowTransaction));
