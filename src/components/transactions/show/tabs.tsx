import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { ITransaction, ITransfer } from 'services/transactions';

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
    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(transaction);
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
