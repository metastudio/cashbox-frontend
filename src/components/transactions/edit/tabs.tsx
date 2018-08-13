import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { ID } from 'model-types';
import { ITransaction, ITransfer } from 'services/transactions';

import EditNormal from './normal';
import EditTransfer from './transfer';

interface IProps {
  orgId:       ID;
  transaction: ITransaction;
}

class ShowTransactionTabs extends React.PureComponent<IProps> {
  private renderTransferTab = (orgId: ID, transaction: ITransfer) => (
    <Tab eventKey={ 1 } title="Transfer">
      <EditTransfer orgId={ orgId } transfer={ transaction } />
    </Tab>
  )

  private renderNormalTab = (orgId: ID, transaction: ITransaction) => (
    <Tab eventKey={ 1 } title={ transaction.category.type }>
      <EditNormal type={ transaction.category.type } orgId={ orgId } transaction={ transaction } />
    </Tab>
  )

  private renderTab = (transaction: ITransaction) => {
    const { orgId } = this.props;

    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(orgId, transaction);
    }

    return this.renderNormalTab(orgId, transaction);
  }

  public render() {
    return (
      <Tabs defaultActiveKey={ 1 } id="transactionType">
        { this.renderTab(this.props.transaction) }
      </Tabs>
    );
  }
}

export default ShowTransactionTabs;
