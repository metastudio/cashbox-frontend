import * as React from 'react';

import { Transaction } from 'model-types';

import Row from './table-row';

interface Props {
  transactions: Transaction[];
}

const TransactionsTableBody: React.SFC<Props> = ({ transactions }) => (
  <tbody>
    { transactions.map((t) => <Row transaction={ t } key={ t.id } />) }
  </tbody>
);

export default TransactionsTableBody;
