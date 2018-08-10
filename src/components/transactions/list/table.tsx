import * as React from 'react';
import { Table } from 'react-bootstrap';

import { ITransaction } from 'services/transactions';

import Row from './table-row';

interface IProps {
  transactions: ITransaction[];
}

const TransactionsTableBody: React.SFC<IProps> = ({ transactions }) => (
  <Table striped responsive hover id="transactions">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Category</th>
        <th>Account</th>
        <th>Customer</th>
        <th>Comment</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      { transactions.map(t => <Row transaction={ t } key={ t.id } />) }
    </tbody>
  </Table>
);

export default TransactionsTableBody;
