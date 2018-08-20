import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { ID } from 'model-types';
import { CategoryType } from 'services/categories';
import { ITransaction, isTransfer, ITransfer } from 'services/transactions';

import NewNormal   from './normal';
import NewTransfer from './transfer';

interface IProps {
  orgId:            ID;
  copyTransaction?: ITransaction;
}

const NewTransactionTabs: React.SFC<IProps> = ({ orgId, copyTransaction }) => {
  let activeTab = 1;

  let copyTransfer;

  if (copyTransaction) {
    if (isTransfer(copyTransaction)) {
      activeTab = 3;
      copyTransfer = copyTransaction as ITransfer;
      copyTransaction = undefined;
    } else if (copyTransaction.category.type === CategoryType.Expense) {
      activeTab = 2;
    }
  }

  return (
    <Tabs defaultActiveKey={ activeTab } mountOnEnter id="transactionType">
      <Tab eventKey={ 1 } title="Income">
        <NewNormal
          orgId={ orgId }
          type={ CategoryType.Income }
          copyTransaction={ copyTransaction }
        />
      </Tab>
      <Tab eventKey={ 2 } title="Expense">
        <NewNormal
          orgId={ orgId }
          type={ CategoryType.Expense }
          copyTransaction={ copyTransaction }
        />
      </Tab>
      <Tab eventKey={ 3 } title="Transfer">
        <NewTransfer orgId={ orgId } copyTransfer={ copyTransfer } />
      </Tab>
    </Tabs>
  );
};

export default NewTransactionTabs;
