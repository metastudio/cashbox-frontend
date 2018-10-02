import * as React from 'react';

import { Table } from 'react-bootstrap';

import { CURRENCIES } from 'constants/currencies';
import { ITransactionsSummary } from 'services/transactions-summary';

import Line from './table-line';

interface IProps {
  summary: ITransactionsSummary;
}

const TransactionsSummary: React.SFC<IProps> = ({ summary }) => {
  return (
    <Table condensed striped>
      <thead>
        <tr>
          <th>Currency</th>
          <th className="text-right">Income</th>
          <th className="text-right">Expense</th>
          <th className="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        { CURRENCIES.map(c => <Line key={ c } title={ c } summaryLine={ summary[c] } />) }
        <Line title="Total" summaryLine={ summary.total } />
      </tbody>
    </Table>
  );
};

export default TransactionsSummary;
