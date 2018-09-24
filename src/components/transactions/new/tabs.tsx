import * as React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

import { ID } from 'model-types';
import { CategoryType } from 'services/categories';
import { isTransfer, ITransaction, ITransfer } from 'services/transactions';

import NewNormal   from './normal';
import NewTransfer from './transfer';

interface IProps {
  orgId:            ID;
  copyTransaction?: ITransaction;
}

const NewTransactionTabs: React.SFC<IProps> = ({ orgId, copyTransaction }) => {
  let activeTab = 1;

  let copyTrans = copyTransaction;
  let copyTransfer;

  if (copyTrans) {
    if (isTransfer(copyTrans)) {
      activeTab = 3;
      copyTransfer = copyTrans as ITransfer;
      copyTrans = undefined;
    } else if (copyTrans.category.type === CategoryType.Expense) {
      activeTab = 2;
    }
  }

  return (
    <Tabs defaultActiveKey={ activeTab } mountOnEnter id="transactionType">
      <Tab eventKey={ 1 } title="Income">
        <NewNormal
          orgId={ orgId }
          type={ CategoryType.Income }
          copyTransaction={ copyTrans }
        />
      </Tab>
      <Tab eventKey={ 2 } title="Expense">
        <NewNormal
          orgId={ orgId }
          type={ CategoryType.Expense }
          copyTransaction={ copyTrans }
        />
      </Tab>
      <Tab eventKey={ 3 } title="Transfer">
        <NewTransfer orgId={ orgId } copyTransfer={ copyTransfer } />
      </Tab>
    </Tabs>
  );
};

export default NewTransactionTabs;
