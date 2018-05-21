import * as React from 'react';
import { Link } from 'react-router-dom';
import Transactions from './list/transactions';

const TransactionsList: React.SFC<{}> = () => {
  return(
    <>
      <Link to="/transactions/new" className="btn btn-default pull-right">New Transaction</Link>
      <h1>Transactions</h1>
      <Transactions />
    </>
  );
};

export default TransactionsList;
