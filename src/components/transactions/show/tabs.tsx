import * as React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

import { isTransfer, ITransaction, ITransfer } from 'services/transactions';

import ShowNormal from './normal';
import ShowTransfer from './transfer';

interface IProps {
  transaction: ITransaction;
}

class ShowTransactionTabs extends React.PureComponent<IProps> {
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
    if (isTransfer(transaction)) {
      return this.renderTransferTab(transaction as ITransfer);
    }

    return this.renderNormalTab(transaction);
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
