import * as React from 'react';

import NewTransaction from './new';
import Transactions from './list/transactions';

const TransactionsList: React.SFC<{}> = () => {
  return(
    <>
      <NewTransaction />
      <Transactions />
    </>
  );
};

export default TransactionsList;
